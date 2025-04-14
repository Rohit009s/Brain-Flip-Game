import { motion } from 'framer-motion';

interface CertificateProps {
  playerName: string;
  score: number;
  onClose: () => void;
  onDownload: () => void;
}

export function Certificate({ playerName, score, onClose, onDownload }: CertificateProps) {
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-[url('https://images.unsplash.com/photo-1524158637745-544d0d0d8b3c?auto=format&fit=crop&q=80')] bg-cover bg-center p-12 rounded-xl max-w-2xl w-full mx-4 relative"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div className="absolute inset-0 bg-white bg-opacity-90 rounded-xl" />
        <div className="relative z-10">
          <div className="text-center space-y-6">
            <h2 className="text-4xl font-bold text-purple-600 font-serif">Certificate of Achievement</h2>
            <div className="my-8">
              <p className="text-2xl text-gray-700">This certifies that</p>
              <p className="text-3xl font-bold text-purple-800 my-4">{playerName}</p>
              <p className="text-xl text-gray-700">has achieved the prestigious title of</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent my-4">
                Einstein's Brain Sorcerer
              </p>
              <p className="text-lg text-gray-600">
                with an extraordinary score of {score} points in the Brain Flip Challenge
              </p>
            </div>
            <div className="flex justify-center space-x-6 mt-8">
              <motion.button
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onDownload}
              >
                Download Certificate
              </motion.button>
              <motion.button
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
              >
                Close
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}