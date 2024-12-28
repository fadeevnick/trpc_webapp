export const ideas = [...Array(100).keys()].map((num: number) => ({
  nick: `cool-idea-nick-${num + 1}`,
  name: `Idea ${num + 1}`,
  description: `Description of idea ${num + 1}...`,
  text: [...Array(100).keys()]
    .map((num2: number) => `<p>Text paragraph ${num2 + 1} of idead ${num + 1}...</p>`)
    .join(''),
}))
