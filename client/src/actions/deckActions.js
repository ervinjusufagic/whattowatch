export default function incrementId(idIndex) {
  return {
    type: "INCREMENT_ID",
    payload: {
      idIndex: idIndex + 1
    }
  };
}
