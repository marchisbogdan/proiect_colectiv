let getPdfsURL = "/getPDFs";
let documentMap = new Map();
(() => {
  // attach the functions to the buttons
  // detach the events on element deletion
  let button = document.getElementById("pdfLoader");
  button.addEventListener('click',loadMyPdfs);
  let form_button = document.getElementById('form-button');
  form_button.addEventListener('click',sendCreatedFile);
})();

function snackBar(text){
  alert("hi");
  let x = document.getElementById('snackBar');

  x.className = "show";
  x.innerText = text ? text : "Missing text";

  setTimeout(()=>{
    x.className = x.className.replace("show","");
  }, 3000);
}

function checkFormFilds() {
  let description = document.getElementById('description-input');
  let keys_input = document.getElementById('keys-input');
  let file_input = document.getElementById('file-input');
  let ok = 1;
  if (description.value === null || description.value === "") {
    let parent = description.parentNode;
    parent.className += " has-error";
    let help = document.getElementById('helpBlock1');
    help.innerText = "Please add a description.";
    ok=0;
  }else{
    description.parentNode.className = "form-group";
    let help = document.getElementById('helpBlock1');
    help.innerText = "";
  }
  if (keys_input.value === null || keys_input.value === "") {
    let parent = keys_input.parentNode;
    parent.className += " has-warning";
    ok=0;
  }else{
    keys_input.parentNode.className = "form-group";
  }
  if (file_input.files.length === 0) {
    let parent = file_input.parentNode.parentNode;
    parent.className += " has-error";
    let help = document.getElementById('helpBlock2');
    help.innerText = "Please add a file.";
    ok=0;
  }else{
    if(file_input.files[0].type === "application/pdf" || file_input.files[0].type === "application/msword"){

    }
    file_input.parentNode.parentNode.className = "form-group";
    let help = document.getElementById('helpBlock2');
    help.innerText = "";
  }
  return ok === 1;
}

function sendCreatedFile(){
  if(checkFormFilds() === true){
    let description = document.getElementById('description-input');
    let keys_input = document.getElementById('keys-input');
    let file_input = document.getElementById('file-input');

    let formData = new FormData();
    formData.append("description",description.val);
    formData.append("key_words",keys_input.val);
    formData.append("file",file_input.files[0], file_input.files[0].name);

    let request = new XMLHttpRequest();
    request.open("POST","localhost:8080//addDoc.php");
    request.onload = () => {
      if(request.status == 200){
        alert("Uploaded!");
      }else{
        alert("Error!");
      }
    };
    request.send(formData);
  }
}

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
    },{
      'id':11234,
      'version': '1.2',
      'status': 'Final',
      'author': 'tom',
      'creationDate':'1/1/2010',
      'modificationDate':'2/3/2012',
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
  let col_md_div = createTag("DIV",['col-md-3','document']);
  let doc_container = createTag("DIV",['doc-container'],{'id':obj.id,'style':'font-size:18px'});
  let thumbnail = createTag("IMG",['img-thumbnail'], {'src':"",'alt':'a img','style':'width:100%'});

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
