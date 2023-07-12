import { motion } from "framer-motion";

export default function DummyPage(props) {
  const { setPage } = props;
  return (
    <motion.div
      initial={{ y: 300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -300, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="main-content">
        <h1>Dummy Page</h1>
        <button onClick={() => setPage && setPage("home")}>Go to Home</button>
      </div>
    </motion.div>
  );
}
