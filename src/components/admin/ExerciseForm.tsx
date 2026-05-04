"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Exercise } from "@/types";

interface Props {
  exercise?: Exercise & { pdf_url?: string | null };
  subjects: { id: string; title: string }[];
}

export default function ExerciseForm({ exercise, subjects }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Estado del formulario
  const [form, setForm] = useState({
    subject_id: exercise?.subject_id ?? subjects[0]?.id ?? "",
    title: exercise?.title ?? "",
    statement: exercise?.statement ?? "",
    solution: exercise?.solution ?? "",
    show_solution: exercise?.show_solution ?? false,
    order_index: exercise?.order_index ?? 0,
  });

  // Estados para el PDF
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(
    exercise?.pdf_url ?? null,
  );
  const [pdfLoading, setPdfLoading] = useState(false);
  const [savedExerciseId, setSavedExerciseId] = useState<string | null>(
    exercise?.id ?? null,
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const method = exercise ? "PUT" : "POST";
    const url = exercise
      ? `/api/admin/exercises/${exercise.id}`
      : "/api/admin/exercises";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Error al guardar");
      setLoading(false);
      return;
    }

    const saved = await res.json();
    const exerciseId = exercise?.id || saved.id;
    setSavedExerciseId(exerciseId);

    // Si hay un archivo seleccionado, se sube después de guardar el ejercicio
    if (pdfFile && exerciseId) {
      await uploadPdf(pdfFile, exerciseId);
    }

    router.push("/admin/exercises");
    router.refresh();
  }

  async function uploadPdf(file: File, exerciseId: string) {
    setPdfLoading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("exerciseId", exerciseId); // Cambiado de noteId a exerciseId

    // Asegúrate de que tu endpoint soporte 'exerciseId' o usa uno nuevo
    const res = await fetch("/api/admin/upload-pdf", {
      method: "POST",
      body: fd,
    });

    const data = await res.json();

    if (res.ok) {
      setPdfUrl(data.url);
      setPdfFile(null);
    } else {
      setError(data.error ?? "Error al subir el PDF");
    }
    setPdfLoading(false);
  }

  async function handleRemovePdf() {
    if (!savedExerciseId) return;
    if (!confirm("¿Eliminar el PDF adjunto de este ejercicio?")) return;

    setPdfLoading(true);
    // Pasamos exerciseId como query param para que el backend sepa qué borrar
    const res = await fetch(
      `/api/admin/upload-pdf?exerciseId=${savedExerciseId}`,
      {
        method: "DELETE",
      },
    );

    if (res.ok) {
      setPdfUrl(null);
    } else {
      setError("No se pudo eliminar el archivo");
    }
    setPdfLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">
            Tema
          </label>
          <select
            required
            value={form.subject_id}
            onChange={(e) =>
              setForm((f) => ({ ...f, subject_id: e.target.value }))
            }
            className="input"
          >
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">
            Orden
          </label>
          <input
            type="number"
            min={0}
            value={form.order_index}
            onChange={(e) =>
              setForm((f) => ({ ...f, order_index: Number(e.target.value) }))
            }
            className="input"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-1.5">
          Título del ejercicio
        </label>
        <input
          type="text"
          required
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          className="input"
          placeholder="Ej: Cálculo de números cuánticos"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-1.5">
          Enunciado{" "}
          <span className="text-muted font-normal text-xs">
            (HTML permitido)
          </span>
        </label>
        <textarea
          required
          rows={6}
          value={form.statement}
          onChange={(e) =>
            setForm((f) => ({ ...f, statement: e.target.value }))
          }
          className="input font-mono text-sm resize-y"
          placeholder="<p>Dado el átomo de oxígeno...</p>"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-1.5">
          Solución{" "}
          <span className="text-muted font-normal text-xs">
            (HTML — opcional)
          </span>
        </label>
        <textarea
          rows={6}
          value={form.solution}
          onChange={(e) => setForm((f) => ({ ...f, solution: e.target.value }))}
          className="input font-mono text-sm resize-y"
          placeholder="<p>La configuración electrónica es...</p>"
        />
      </div>

      {/* SECCIÓN PDF (Misma estética que NoteForm) */}
      <div>
        <label className="block text-sm font-medium text-ink mb-1.5">
          PDF del ejercicio{" "}
          <span className="text-muted font-normal text-xs">
            (opcional, máx. 20 MB)
          </span>
        </label>
        {pdfUrl ? (
          <div className="flex items-center gap-3 p-3 border border-border rounded-lg bg-white">
            <span className="text-red-500 text-xl">📄</span>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-accent hover:underline flex-1 truncate"
            >
              Ver PDF actual
            </a>
            <button
              type="button"
              onClick={handleRemovePdf}
              disabled={pdfLoading}
              className="text-xs text-danger hover:underline disabled:opacity-50"
            >
              {pdfLoading ? "Eliminando..." : "Eliminar"}
            </button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-border rounded-lg p-4 bg-white">
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setPdfFile(e.target.files?.[0] ?? null)}
              className="block w-full text-sm text-muted file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border file:border-border file:text-sm file:font-medium file:text-ink file:bg-paper-dark file:cursor-pointer"
            />
            {pdfFile && (
              <p className="mt-2 text-xs text-muted">
                {pdfFile.name} — {(pdfFile.size / 1024 / 1024).toFixed(1)} MB
              </p>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="show_solution"
          checked={form.show_solution}
          onChange={(e) =>
            setForm((f) => ({ ...f, show_solution: e.target.checked }))
          }
          className="w-4 h-4 accent-accent"
        />
        <label htmlFor="show_solution" className="text-sm font-medium text-ink">
          Mostrar solución a los alumnos
        </label>
      </div>

      {error && (
        <p className="text-danger text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading || pdfLoading}
          className="bg-accent text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {loading
            ? "Guardando..."
            : exercise
              ? "Guardar cambios"
              : "Crear ejercicio"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-5 py-2 border border-border rounded-lg hover:bg-paper-dark transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
