 let qrText = document.getElementById("qrText");
                                let qrBox = document.getElementById("qrBox");
                                let qrImg = document.getElementById("qrImg");
                                let download = document.getElementById("download");
                                let button = document.getElementById("button");
                                function generateQR(){
                                if(qrText.value.length > 0){
                                qrImg.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
                                qrText.value;
                                qrBox.classList.add("show-img");
                                button.style.display = "block";
                                download.href = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
                                qrText.value;
                                download.download = qrText.value;
                                console.log(download.href.value);
                                }else{
                                qrText.classList.add("error");
                                setTimeout(()=>{
                                qrText.classList.remove("error");
                                }, 1000)
                                }

                                }
