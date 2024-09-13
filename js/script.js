/* =========== typing animation ============*/
var typed = new Typed(".typing",{
    strings:["AI Researcher", "AI Enthusiast", "AI Student"],
    typeSpeed : 80,
    BackSpeed:60,
    loop:true
})
/* =================== Aside ================ */
const nav = document.querySelector(".nav"),
      navList = nav.querySelectorAll("li"),
      totalNavList = navList.length,
      allSection = document.querySelectorAll(".section"),
      totalSection = allSection.length;
      for(let i = 0; i<totalNavList; i++)
        {
            const a= navList[i].querySelector("a");
            a.addEventListener("click", function()
            {
                removeBackSection(); 
                for(let j=0; j<totalNavList; j++)
                {
                if(navList[j].querySelector("a").classList.contains("active"))
                {
                    addBackSection(j);
                    // allSection[j].classList.add("back-section");
                }
                navList[j].querySelector("a").classList.remove("active");  
                }
                this.classList.add("active")
                showSection(this);
                if(window.innerWidth < 1200)
                {
                    asideSectionTogglerBtn();
                }
            })
        }
        function removeBackSection()
        {
            for(let i=0; i<totalSection; i++)
                {
                    allSection[i].classList.remove("back-section");
                }
        }

        function addBackSection(num)
        {
            allSection[num].classList.add("back-section");
        }

        function showSection(element)
        {
            for(let i=0; i<totalSection; i++)
            {
                allSection[i].classList.remove("active");
            }
            const target = element.getAttribute("href").split("#")[1];
            document.querySelector("#" + target).classList.add("active")
            
        }

        function updateNav(element)
        {
           for(let i=0; i<totalSection; i++)
            {
               navList[i].querySelector("a").classList.remove("active");
               const target = element.getAttribute("href").split("#")[1];
               if(target === navList[i].querySelector("a").getAttribute("href").split("#")[1])
                {
                    navList[i].querySelector("a").classList.add("active");
                }

            } 
        }
       
        const navTogglerBtn = document.querySelector(".nav-toggler"),
              aside = document.querySelector(".aside");
              navTogglerBtn.addEventListener("click", () =>
              {
                asideSectionTogglerBtn();
              })
              function asideSectionTogglerBtn()
              {
                aside.classList.toggle("open");
                navTogglerBtn.classList.toggle("open");
                for(let i=0; i<totalSection; i++)
                {
                    allSection[i].classList.toggle("open");
                }
              }

/* =================== Contact Form ================ */

function sendEmail() {
    var name = document.getElementById('fullname').value;
    var subject = document.getElementById('subjectf').value;
    var Email  = document.getElementById('emailaddr').value;
    var messagenote = document.getElementById('messagenote').value;
    
    // Encode the body text to handle newlines and special characters
    let body = encodeURIComponent(`name: ${name}\nContact Email: ${Email}\n ${messagenote}`);
    
    window.open(`mailto:dhanvanthyerramreddy09@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`);
}


        
