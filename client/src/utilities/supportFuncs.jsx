export const dataToObj = (data) => {
  let objData = [];
  const idSet = new Set();
  data.forEach(element => idSet.add(element.id));

  for (const id of idSet){
      const tempObj = {"id": id, "question": null, "answer": null, "choiceDesc": []};
      data.forEach(element => {
          if (element.id === id){
              if (!tempObj.question) tempObj.question = element.question;
              if (!tempObj.answer) tempObj.answer = element.answer;
              tempObj.choiceDesc[element.choice-1] = element.description;
          }
      })
      objData.push(tempObj); 
  };
  return objData;
};