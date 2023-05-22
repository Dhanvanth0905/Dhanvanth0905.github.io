var scope=document.querySelector('body')
var contextmenu=document.querySelector('#contextMenu')
var options=document.querySelectorAll(".item")
var submitCaptionbtn=document.querySelector("submitCaption")
var container=document.getElementById("container")


var test;
var curr;

scope.addEventListener("contextmenu",(e)=>{
    e.preventDefault();
    const{clientX:mouseX,clientY:mouseY}=e;
    contextmenu.style.top=`${mouseY}px`
    contextmenu.style.left=`${mouseX}px`
    contextmenu.classList.add("visible")
    curr=e
},false);

contextmenu.addEventListener('click',(event)=>{
    if(event.target.id=="it6"){
        curr.target.style.filter="grayscale(100%)";
        
        let img=document.createElement("img")
        img.src=curr.target.src
        filter[0].push(img)

    }
    if(event.target.id=="it1"){
        curr.target.style.filter="brightness(150%)"

    }
    if (event.target.id==="it2"){
        var newImage=reduceResolution(curr.target)
        curr.target.src=newImage
    }
    if (event.target.id=="it4"){
            test=curr
            var duplicateImage=document.createElement('IMG')
            var div=document.createElement("div")
            duplicateImage.src=curr.target.src
            div.append(duplicateImage)
            container.appendChild(div)
    }
    if(event.target.id=="it3"){
        curr.target.style.borderRadius="50%";
            curr.target.style.width='150px';
            curr.target.style.height='150px';
            curr.target.style.display="flex";
            curr.target.style.alignItems='center';
    }
    
        // if (event.target.id="it7"){
        //     const canvas = document.createElement('canvas');
        //     const ctx = canvas.getContext('2d');
        
        //     canvas.width = 200; // set the thumbnail width to 200 pixels
        //     canvas.height = 200; // set the thumbnail height to 200 pixels
        //     const originalImage = curr.target
        //     ctx.drawImage(originalImage, 0, 0, originalImage.width, originalImage.height, 0, 0, canvas.width, canvas.height);
        // const thumbnailDataURL = canvas.toDataURL();
        // curr.target.src=thumbnailDataURL

        // }
    if (event.target.id=="it5"){
        console.log(generateQRCode(curr))
    }
   
    if(event.target.id=="it7"){
        console.log(curr.target)
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
    
        canvas.width = curr.target.width;
        canvas.height = curr.target.height;
    
        ctx.drawImage(curr.target, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < imageData.data.length; i += 4) imageData.data[i] = 255;

        ctx.putImageData(imageData, 0, 0);

        curr.target.src = canvas.toDataURL();
        let img=document.createElement("img")
        img.src=curr.target.src
        filter[1].push(img)

    }
    if(event.target.id=="it8"){
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
    
        canvas.width = curr.target.width;
        canvas.height = curr.target.height;
    
        ctx.drawImage(curr.target, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        for (let i = 4; i < imageData.data.length; i += 4) imageData.data[i+1] = 255;

        ctx.putImageData(imageData, 0, 0);

        curr.target.src = canvas.toDataURL();
        let img=document.createElement("img")
        img.src=curr.target.src
        filter[2].push(img)

    }
    if(event.target.id=="it9"){
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
    
        canvas.width = curr.target.width;
        canvas.height = curr.target.height;
    
        ctx.drawImage(curr.target, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < imageData.data.length; i += 4) imageData.data[i+2] = 255;

        ctx.putImageData(imageData, 0, 0);

        curr.target.src = canvas.toDataURL();
        let img=document.createElement("img")
        img.src=curr.target.src
        filter[3].push(img)

    }
    if(event.target.id=="it10"){
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        rgb={r:0,g:0,b:0}
        canvas.width = curr.target.width;
        canvas.height = curr.target.height;
    
        ctx.drawImage(curr.target, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let color=""
        for (let i = 0; i < imageData.data.length; i+=4){
            rgb.r+=imageData.data[i]
            rgb.g+=imageData.data[i+1]
            rgb.b+=imageData.data[i+2]
        }
        if(rgb.r>rgb.g && rgb.r>rgb.b){
            color="red"
        }
        if(rgb.g>rgb.r && rgb.g>rgb.b){
            color="green"
        }
        if(rgb.b>rgb.r && rgb.b>rgb.g){
            color="blue"
        }
        
        let imageDiv=document.getElementById(curr.target.id+"d")
        let colorpopup=document.createElement("div")
        colorpopup.textContent=color
        colorpopup.style.zIndex="100"
        imageDiv.append(colorpopup)


    }
    if(event.target.id=="it11"){
        downloadImage(curr.target.src)

    }
});

scope.addEventListener("click",(e)=>{
    if(e.target.offsetParent!=contextmenu){
        contextmenu.classList.remove("visible")
    }
},false);

async function downloadImage(imageSrc) {
    const image = await fetch(imageSrc)
    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)
  
    const link = document.createElement('a')
    link.href = imageURL
    link.download = 'image.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }




function reduceResolution(target){
var img = new Image();
img.src=target.src
img.crossOrigin="anonynomous"
var canvas = document.createElement('canvas');
var reducedImageData;
  resImage=img.onload = function() {
      canvas.width = img.width/10;
      canvas.height = img.height/10;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(img,0,0, canvas.width, canvas.height);
      reducedImageData = canvas.toDataURL();
      return reducedImageData
    }();
    return resImage
}

function generateQRCode(e){
    const qrCode = new QRCodeStyling({
        width: 300,
        height: 300,
        type: "svg",
        data:  e.target.src,
        image: e.target.src,
        dotsOptions: {
            color: "#4267b2",
            type: "rounded"
        },
        backgroundOptions: {
            color: "#e9ebee",
        },
        imageOptions: {
            crossOrigin: "anonymous",
            margin: 20
        }
    });

    qrCode.append(document.getElementById("canvas"));
    qrCode.download({ name: "qr", extension: "svg" });
}