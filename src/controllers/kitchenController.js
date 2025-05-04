let kotList = [];

const listAllKOTs = (req, res) => {
  res.json(kotList);
};

const updateKOTStatus = (req, res) => {
  const { kotId } = req.params;
  const { status } = req.body;
  kotList = kotList.map(kot =>
    kot.id == kotId ? { ...kot, status } : kot
  );
  res.json({ message: 'Status updated', kotId, status });
};

module.exports = { listAllKOTs, updateKOTStatus };