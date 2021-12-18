const canvas = document.getElementById("jsCanvas");  //id 값으로 찾기
const ctx = canvas.getContext("2d");   //픽섹을 2d로 작업
const colors = document.getElementsByClassName("jsColor"); //class이름으로 찾기
const range = document.getElementById("jsRange") //범위
const mode = document.getElementById("jsMode");  //mode 채우는것과 선으로 그리는것
const saveBtn = document.getElementById("jsSave"); //저장버튼


const INITIAL_COLOR ="#2c2c2c"   //초기색 검은색
const CANVAS_SIZE=700;  //초기 canvas 사이즈 설정

// 픽셀사이즈를 줘야한다.
canvas.width=CANVAS_SIZE;
canvas.height=CANVAS_SIZE;

ctx.fillStyle="white";
ctx.fillRect(0,0,CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle=INITIAL_COLOR;  //처음 색
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth=2.5;    //선의 너비

let painting = false;   //처음 painting은 false
let filling = false;      

function stopPainting(){
    painting=false;     //painting하다가 멈추면 종료시키기
}
function startPainting(){
    painting = true;   //painting 시작하면 true
}

function onMouseMove(event){
    const X = event.offsetX;    //마우스 움직일때 좌표
    const Y = event.offsetY;
    if(!painting){             //마우스 클릭안할때  path는 선
        ctx.beginPath();       //새로운 경로를 만든다.
        ctx.moveTo(X,Y);       //x,y좌표로   움직이는 동안 path를 만든다.
    }
    else{                   //그림 그리면
        ctx.lineTo(X,Y);    //라인 그려주고
        ctx.stroke();       //stroke 로 채워줌
        //ctx.closePath();  //path가 끝나서 이문장을 써주면 시작점부터 마우스가 움직이는 곳까지 선이 계속 만들어진다.
    }
}

function onMouseDown(event){
    painting=true;           
} 

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;    //클릭하면 event 안에 style 안에 backgroudcolor를 rgb로 가져옴
    ctx.strokeStyle= color;
    ctx.fillStyle=color;
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth=size;
}

function handleModeClick() {         //fill누르면 paint로 바꾸고 paint 누르면 fill로 바꿈
    if(filling===true){
        filling = false;
        mode.innerText="Fill";
    }
    else{
        filling=true;
        mode.innerText="PAINT";
    }
}

function handleCanvasClick() {
    if(filling){
        ctx.fillRect(0,0,CANVAS_SIZE, CANVAS_SIZE);     //filling으로 되어있으면 값 채우기
    }
}
function hanldeCM(event) {
    event.preventDefault();       //우클릭방지
}
function handleSaveClick() {
    const image = canvas.toDataURL();                     //캔버스의 이미지주소를 가져옴
    const link = document.createElement("a");        //링크생성
    link.href=image;                        //링크 주소
    link.download = "PaintJS[EXPORT]";      //다운로드 이름
    link.click();                      //링크 클릭
}

if(canvas) {
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu", hanldeCM);    //우클릭방지
}

Array.from(colors).forEach(color =>                    //맨위에서 class 이름으로 찾은 colors를
    color.addEventListener("click",handleColorClick)    //클릭하면 handlecolorclick 실행
    );  

if(range) {
    range.addEventListener("input", handleRangeChange);
}

if(mode) {
    mode.addEventListener("click",handleModeClick);
}
if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}