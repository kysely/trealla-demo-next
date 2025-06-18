// @ts-expect-error bad types
import { load as loadProlog, Prolog } from "trealla-multibundle";

export const GET = async () => {
  await loadProlog();

  const pl = new Prolog();

  const facts = `
likes(sam, salad).
likes(dean, pie).
likes(sam, apples).
likes(dean, whiskey).
  `.trim();

  const query = "likes(sam, X).";

  const plGoal = pl.query(query, { program: facts, autoyield: 0 });

  const answers = [];

  for await (const answer of plGoal) {
    if (answer.status === "success") {
      console.info("success!", answer.answer);
      answers.push(answer.answer);
    } else {
      console.error(JSON.stringify(answer, null, 2));
    }
  }

  return new Response(
    JSON.stringify({ consult: facts, query, answers }, null, 2)
  );
};
