let getPdfsURL = "/getPDFs";
let documentMap = new Map();
(() => {
  // attach the functions to the buttons
  // detach the events on element deletion
  let button = document.getElementById("pdfLoader");
  button.addEventListener('click',loadMyPdfs);
})();

  /**
   * GET :- an img of the pdf - OPTIONAL : BLOB // Something representative
   *  - id_of_the_document : integer
   *  - the version : string
   *  - status : string
   *  - the author : string
   *  - creation date : string
   *  - the last modification date : string
   *  - descriere :string
   *  - cuvinte cheie : array
   */
function loadMyPdfs() {
    // $.get(getPDFs, function(data,status){
    //   data.map((object) => {saveDocumentProperties(object,(obj)=>{
    //     addTheDocumentToDashboard(obj);
    //   })})
    // });


    // this is an example of data
    data = [{
      'id':12,
      'version': '1.2',
      'status': 'Final',
      'author': 'bob',
      'creationDate':'1/1/2010',
      'modificationDate':'2/3/2011',
      'keyWords':['a doc','ubb'],
      'description':'a simple doc.'
    }];
      data.map((object) => {saveDocumentProperties(object,(obj)=>{
        addTheDocumentToDashboard(obj);
      })})
  }

  /**
   * create the element and add it to the UI
   */
  function saveDocumentProperties(obj,callback){
    let object = {};

    // object.img ??
    object.id = obj.id;
    object.version = obj.version;
    object.status = obj.status;
    object.author = obj.author;
    object.creationDate = obj.creationDate;
    object.modificationDate = obj.modificationDate;
    object.description = obj.description;
    object.keyWords = [];
    for (let word of obj.keyWords) {
      object.keyWords.push(word);
    }
    documentMap.set(obj.id, object);
    callback(object);
  }

function addTheDocumentToDashboard(obj){
  let dropZone = document.getElementById('documentZone');
  let col_md_div = createTag("DIV",['col-md-3']);
  let doc_container = createTag("DIV",['doc-container'],{'id':obj.id});
  let thumbnail = createTag("IMG",['img-thumbnail'], {'src':"",'alt':'a img'});

  let label_status = createTag("SPAN",['label','label-info'],{},"Status");
  let div_status = createTag("DIV",["doc-info doc-status"],{},obj.status);

  let label_author = createTag("SPAN",['label','label-info'],{},"Author");
  let div_author = createTag("DIV",["doc-info doc-author"],{},obj.author);

  let label_creation = createTag("SPAN",['label','label-info'],{},"Creation Date");
  let div_creation = createTag("DIV",["doc-info doc-creation-date"],{},obj.creationDate);

  let label_modification = createTag("SPAN",['label','label-info'],{},"Modification Date");
  let div_modification = createTag("DIV",["doc-info doc-modification-date"],{},obj.modificationDate);

  let actions_container = createTag("DIV",['actions_container']);

  let download_btn = createTag("BUTTON",['btn','btn-primary','btn-sm'],{'type':'button','name':'download'},'Download');

  let upload_label = createTag("LABEL",['btn','btn-primary','btn-sm','btn-file'],{},"Upload");
  let upload_input = createTag("INPUT",[],{'type':'file','style':'display:none;','accept':'application/pdf'},'');

  let delete_btn = createTag("BUTTON",['btn','btn-danger','btn-sm'],{'type':'button','name':'delete'},'Delete');

  upload_label.appendChild(upload_input);
  actions_container.appendChild(download_btn);
  actions_container.appendChild(upload_label);
  actions_container.appendChild(delete_btn);

  doc_container.appendChild(thumbnail);
  doc_container.appendChild(label_status);
  doc_container.appendChild(div_status);
  doc_container.appendChild(label_author);
  doc_container.appendChild(div_author);
  doc_container.appendChild(label_creation);
  doc_container.appendChild(div_creation);
  doc_container.appendChild(label_modification);
  doc_container.appendChild(div_modification);
  doc_container.appendChild(actions_container);
  col_md_div.appendChild(doc_container);

  dropZone.appendChild(col_md_div);

}

function createTag(type,classNamesArray=[],attrObj={},text=""){
  let tag = document.createElement(type);
  // add the class names for the tag
  for(let name of classNamesArray){
    tag.className += " " + name;
  }
  for (let key in attrObj){
      tag.setAttribute(key,attrObj[key]);
  }
  if(text !== ""){
    let textNode = document.createTextNode(text);
    tag.appendChild(textNode);
  }
  return tag;
}

window.onbeforeunload = function(e){
  let button = document.getElementById("pdfLoader");
  button.removeEventListener('click',loadMyPdfs);
}
