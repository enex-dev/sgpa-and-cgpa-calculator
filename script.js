
const gradePoints={
  "O":10,"A+":9,"A":8,"B+":7,"B":6,"C":5,"P":4,"F":0
};

const container=document.getElementById("subjectsContainer");
const addBtn=document.getElementById("addBtn");
const calcBtn=document.getElementById("calculateBtn");
const resetBtn=document.getElementById("resetBtn");

const themeBtn=document.getElementById("themeToggle");
const heroTitle = document.getElementById("heroTitle");
const heroSubtitle = document.getElementById("heroSubtitle");
const semesterContainer = document.getElementById("semesterContainer");
const addSemesterBtn = document.getElementById("addSemesterBtn");
const resetCgpaBtn = document.getElementById("resetCgpaBtn");
const calculateCgpaBtn = document.getElementById("calculateCgpaBtn");

// ---------- SGPA Dashboard ----------
const resultScore = document.getElementById("resultScore");
const resultBadge = document.getElementById("resultBadge");
const progressFill = document.getElementById("progressFill");
const progressPercent = document.getElementById("progressPercent");
const subjectsStat = document.getElementById("subjectsStat");
const creditsStat = document.getElementById("creditsStat");
const pointsStat = document.getElementById("pointsStat");
const motivationText = document.getElementById("motivationText");

// ---------- CGPA Dashboard ----------
const cgpaScore = document.getElementById("cgpaScore");
const cgpaBadge = document.getElementById("cgpaBadge");
const cgpaProgressFill = document.getElementById("cgpaProgressFill");
const cgpaPercent = document.getElementById("cgpaPercent");
const semesterStat = document.getElementById("semesterStat");
const cgpaCredits = document.getElementById("cgpaCredits");
const cgpaPoints = document.getElementById("cgpaPoints");
const cgpaMessage = document.getElementById("cgpaMessage");

function renumber(){

    const cards=[...container.querySelectorAll(".subject-card")];

    cards.forEach((card,i)=>{

        const num=i+1;

        card.querySelector("h2").textContent=`📘 Subject ${num}`;

        const inputs=card.querySelectorAll("input");

        inputs[0].id=`subject${num}`;
        inputs[1].id=`credits${num}`;

        card.querySelector("select").id=`grade${num}`;

        card.querySelector(".remove-btn").onclick=()=>removeCard(card);
    });

}

const learnTab=document.getElementById("learnTab");

const calculator=document.querySelector(".calculator-card");
const resultCard=document.querySelector(".result-card");
const learnSection=document.querySelector(".learn-section");

const sgpaTab=document.getElementById("sgpaTab");
const cgpaTab=document.getElementById("cgpaTab");

const cgpaSection=document.querySelector(".cgpa-section");

learnTab.onclick=()=>{
    
    heroTitle.textContent = "Learn About SGPA & CGPA";

   heroSubtitle.textContent =
   "Understand grade points, formulas and calculations.";

    calculator.classList.add("hidden");
    resultCard.classList.add("hidden");
    cgpaSection.classList.add("hidden");

    learnSection.classList.remove("hidden");

    learnTab.classList.add("active");
    sgpaTab.classList.remove("active");
    cgpaTab.classList.remove("active");

};

sgpaTab.onclick=()=>{
    heroTitle.textContent = "SGPA Calculator";

    heroSubtitle.textContent =
    "Calculate your Semester Grade Point Average instantly.";

    calculator.classList.remove("hidden");
    resultCard.classList.remove("hidden");

    learnSection.classList.add("hidden");
    cgpaSection.classList.add("hidden");

    sgpaTab.classList.add("active");
    cgpaTab.classList.remove("active");
    learnTab.classList.remove("active");

};

cgpaTab.onclick=()=>{
    
    heroTitle.textContent = "CGPA Calculator";

    heroSubtitle.textContent =
    "Calculate your Cumulative Grade Point Average instantly.";

    calculator.classList.add("hidden");
    resultCard.classList.add("hidden");
    learnSection.classList.add("hidden");

    cgpaSection.classList.remove("hidden");

    cgpaTab.classList.add("active");
    sgpaTab.classList.remove("active");
    learnTab.classList.remove("active");

};

function removeCard(card){

    if(container.children.length===1) return;

    card.style.transition=".25s";
    card.style.opacity="0";
    card.style.transform="translateY(15px)";
    card.style.maxHeight=card.offsetHeight+"px";

    requestAnimationFrame(()=>{
        card.style.maxHeight="0";
        card.style.margin="0";
        card.style.paddingTop="0";
        card.style.paddingBottom="0";
        card.style.overflow="hidden";
    });

    setTimeout(()=>{
        card.remove();
        renumber();
    },250);
}

function renumberSemesters(){

    const cards=[...semesterContainer.querySelectorAll(".semester-card")];

    cards.forEach((card,index)=>{

        card.querySelector("h2").textContent=`📚 Semester ${index+1}`;

        card.querySelector(".removeSemester").onclick=()=>{
            removeSemester(card);
        };

    });

}

function removeSemester(card){

    if(semesterContainer.children.length===1) return;

    card.style.transition=".25s";
    card.style.opacity="0";
    card.style.transform="translateY(15px)";
    card.style.maxHeight=card.offsetHeight+"px";

    requestAnimationFrame(()=>{

        card.style.maxHeight="0";
        card.style.paddingTop="0";
        card.style.paddingBottom="0";
        card.style.margin="0";
        card.style.overflow="hidden";

    });

    setTimeout(()=>{

        card.remove();
        renumberSemesters();

    },250);

}

function addSemester(){

    const number=semesterContainer.children.length+1;

    const card=document.createElement("article");

    card.className="semester-card";

    card.innerHTML=`

        <h2>📚 Semester ${number}</h2>

        <label>SGPA</label>

        <input
        type="number"
        min="0"
        max="10"
        step="0.01"
        placeholder="Enter SGPA">

        <label>Credits</label>

        <input
        type="number"
        min="1"
        placeholder="Total Credits">

        <button class="removeSemester">
            Remove
        </button>

    `;

    card.querySelector(".removeSemester").onclick=()=>removeSemester(card);

    card.style.opacity="0";
    card.style.transform="translateY(15px)";

    semesterContainer.appendChild(card);

    requestAnimationFrame(()=>{

        card.style.transition=".25s";
        card.style.opacity="1";
        card.style.transform="translateY(0)";

    });

}

function newCard(index){
  const card=document.createElement("article");
  card.className="subject-card";
  card.innerHTML=`
  <h2>📘 Subject ${index}</h2>
  <label>Subject Name</label>
  <input type="text" placeholder="Subject (Optional)">
  <div class="row">
    <div>
      <label>Credits</label>
      <input type="number" min="1" max="10">
    </div>
    <div>
      <label>Grade</label>
      <select>
        <option value="">Select Grade</option>
        <option>O</option><option>A+</option><option>A</option>
        <option>B+</option><option>B</option>
        <option>C</option><option>P</option><option>F</option>
      </select>
    </div>
  </div>
  <button class="remove-btn">Remove</button>`;
  card.querySelector(".remove-btn").onclick=()=>removeCard(card);
  card.style.opacity="0";
  card.style.transform="translateY(15px)";
  container.appendChild(card);
  requestAnimationFrame(()=>{
    card.style.transition=".25s";
    card.style.opacity="1";
    card.style.transform="translateY(0)";
  });
}

calculateCgpaBtn.onclick = () => {

    let totalCredits = 0;
    let weightedSum = 0;

    const cards = [...semesterContainer.querySelectorAll(".semester-card")];

    for(const card of cards){

        const inputs = card.querySelectorAll("input");

        const sgpa = Number(inputs[0].value);
        const credits = Number(inputs[1].value);

        if(
            isNaN(sgpa) ||
            isNaN(credits) ||
            sgpa < 0 ||
            sgpa > 10 ||
            credits <= 0
        ){

            cgpaBadge.textContent = "⚠ Invalid Input";

cgpaMessage.textContent =
"Please enter valid SGPA and Credits for every semester.";

            return;
        }

        weightedSum += sgpa * credits;
        totalCredits += credits;

    }

    const cgpa = (weightedSum / totalCredits).toFixed(2);

    animateCgpa(
        Number(cgpa),
        totalCredits,
        cards.length
    );

    setTimeout(() => {

    document
        .querySelector(".cgpa-section .result-card")
        .scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

},300);

};

function animateCgpa(target,totalCredits,semesters){

    let current = 0;

    const weightedPoints = target * totalCredits;

    const step = target / 40;

    const interval = setInterval(()=>{

        current += step;

        if(current >= target){

            current = target;
            clearInterval(interval);

        }
        cgpaBadge.style.background =
"linear-gradient(135deg,#2563eb,#3b82f6)";

        // Main Score
        cgpaScore.textContent = current.toFixed(2);

        // Progress Bar
        const percent = current * 10;

        cgpaProgressFill.style.width = percent + "%";

        cgpaPercent.textContent = percent.toFixed(1) + "%";

        // Stats
        semesterStat.textContent = semesters;

        cgpaCredits.textContent = totalCredits;

        cgpaPoints.textContent = weightedPoints.toFixed(2);

        // Badge & Message

        if(target >= 9){

            cgpaBadge.textContent = "🏆 Outstanding";

            cgpaMessage.textContent =
            "Outstanding academic performance! Keep maintaining this CGPA.";

        }

        else if(target >= 8){

            cgpaBadge.textContent = "🌟 Excellent";

            cgpaMessage.textContent =
            "Excellent work! You're on track for an outstanding degree.";

        }

        else if(target >= 7){

            cgpaBadge.textContent = "😊 Very Good";

            cgpaMessage.textContent =
            "Very good performance. Stay consistent and you'll improve further.";

        }

        else if(target >= 6){

            cgpaBadge.textContent = "👍 Good";

            cgpaMessage.textContent =
            "Good job! A little extra effort each semester will make a big difference.";

        }

        else{

            cgpaBadge.textContent = "💪 Keep Improving";

            cgpaMessage.textContent =
            "Every semester is a chance to improve your CGPA. Keep going!";

        }

    },20);

    

}


resetCgpaBtn.onclick=()=>{

    while(semesterContainer.children.length>1){

        semesterContainer.lastElementChild.remove();

    }

    const first=semesterContainer.firstElementChild;

    first.querySelectorAll("input").forEach(input=>{

        input.value="";

    });

    cgpaScore.textContent = "--";

cgpaBadge.textContent = "Waiting...";

cgpaProgressFill.style.width = "0%";

cgpaPercent.textContent = "0%";

semesterStat.textContent = "0";

cgpaCredits.textContent = "0";

cgpaPoints.textContent = "0";

cgpaMessage.textContent =
"Your CGPA will appear here after calculation.";

    renumberSemesters();

};


addBtn?.addEventListener("click",()=>newCard(container.children.length+1));

calcBtn?.addEventListener("click",()=>{
  let totalCredits=0,totalPoints=0;
  const cards=[...container.querySelectorAll(".subject-card")];
  for(const c of cards){
    const inputs=c.querySelectorAll("input");
    const name=inputs[0].value.trim();
    const credits=Number(inputs[1].value);
    const grade=c.querySelector("select").value;
    if(!credits || !grade){

    resultBadge.textContent = "⚠ Invalid Input";

    resultBadge.style.background = "#ef4444";

    motivationText.textContent =
    "Please complete all subject details before calculating.";

    return;

}
    totalCredits+=credits;
    totalPoints+=credits*gradePoints[grade];
  }
  const sgpa=(totalPoints/totalCredits).toFixed(2);
  animateResult(Number(sgpa),totalCredits,cards.length);

  setTimeout(() => {

    document.querySelector(".result-card").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

},300);
});

function animateResult(target,totalCredits,subjects){

    let current = 0;
    const totalPoints = target * totalCredits;
    const step = target / 40;

    const interval = setInterval(()=>{

        current += step;

        if(current >= target){

            current = target;
            clearInterval(interval);

        }
        // Reset badge style
resultBadge.style.background =
"linear-gradient(135deg,#2563eb,#3b82f6)";

        // Main score
        resultScore.textContent = current.toFixed(2);

        // Progress
        const percent = current * 10;

        progressFill.style.width = percent + "%";
        progressPercent.textContent = percent.toFixed(1) + "%";

        // Stats
        subjectsStat.textContent = subjects;
        creditsStat.textContent = totalCredits;
        pointsStat.textContent = totalPoints.toFixed(2);

        // Badge + Message

        if(target >= 9){

            resultBadge.textContent = "🏆 Outstanding";
            motivationText.textContent =
            "Outstanding performance! Keep aiming for perfection.";

        }

        else if(target >= 8){

            resultBadge.textContent = "🌟 Excellent";
            motivationText.textContent =
            "Excellent work! You're very close to a 9+ SGPA.";

        }

        else if(target >= 7){

            resultBadge.textContent = "😊 Very Good";
            motivationText.textContent =
            "Very good performance. Keep pushing higher.";

        }

        else if(target >= 6){

            resultBadge.textContent = "👍 Good";
            motivationText.textContent =
            "Good job! A little more effort can boost your SGPA.";

        }

        else{

            resultBadge.textContent = "💪 Keep Improving";
            motivationText.textContent =
            "Don't worry. Every semester is a fresh opportunity.";

        }

    },20);

}

resetBtn.addEventListener("click",()=>{

    while(container.children.length>1){
        container.lastElementChild.remove();
    }

    const first=container.firstElementChild;

    first.querySelectorAll("input").forEach(i=>i.value="");
    first.querySelector("select").value="";

    resultScore.textContent = "--";

resultBadge.textContent = "Waiting...";

progressFill.style.width = "0%";

progressPercent.textContent = "0%";

subjectsStat.textContent = "0";

creditsStat.textContent = "0";

pointsStat.textContent = "0";

motivationText.textContent =
"Your SGPA will appear here after calculation.";

    first.querySelector(".remove-btn").onclick=()=>removeCard(first);

    renumber();

});

if(themeBtn){
  const saved=localStorage.getItem("theme");
  if(saved==="dark"){
    document.body.classList.add("dark");
    themeBtn.textContent="☀️";
  }
  themeBtn.onclick=()=>{
    document.body.classList.toggle("dark");
    const dark=document.body.classList.contains("dark");
    themeBtn.textContent=dark?"☀️":"🌙";
    localStorage.setItem("theme",dark?"dark":"light");
  };
}
addSemesterBtn.onclick=()=>{

    addSemester();

};
renumber();
renumberSemesters();
