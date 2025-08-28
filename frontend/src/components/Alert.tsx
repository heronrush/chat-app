import { motion } from "motion/react";

export function Alert({ message }: { message: string }) {
  return (
    <motion.div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-4xl">{message}</h1>
    </motion.div>
  );
}
