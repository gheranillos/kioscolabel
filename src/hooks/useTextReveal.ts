export function splitWords(text: string) {
  return text.split(" ");
}

export const wordVariants = {
  hidden: {
    opacity: 0,
    y: "110%",
    rotateX: -40,
    filter: "blur(4px)",
  },
  visible: (i: number) => ({
    opacity: 1,
    y: "0%",
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.65,
      delay: i * 0.07,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
} as any;
