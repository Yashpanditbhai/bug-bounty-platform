import { useState } from "react";
import { useAppDispatch } from "@/hooks/hooks";

const SubmitSolution = ({ bugCode }: { bugCode: string }) => {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState({
    description: "",
    proof: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // dispatch(
    //   submitSolution({
    //     bugCode,
    //     description: form.description,
    //     proof: form.proof,
    //   }),
    // );
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 mt-6 bg-white">
      <h3 className="text-sm font-semibold mb-3">Submit Your Solution</h3>

      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          className="input"
          rows={4}
          placeholder="Explain how you fixed or exploited the bug..."
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />

        <input
          className="input"
          placeholder="Proof link (GitHub / Drive / Image URL)"
          value={form.proof}
          onChange={(e) => setForm({ ...form, proof: e.target.value })}
          required
        />

        <button className="btn-primary text-sm">Submit Solution</button>
      </form>
    </div>
  );
};

export default SubmitSolution;
