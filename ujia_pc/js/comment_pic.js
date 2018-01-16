        $(document).on({
            drop:function(e){
                e.preventDefault();
            },
            dragleave:function(e){
                e.preventDefault();
            },
            dragenter:function(e){
                e.preventDefault();
            },
            dragover:function(e){
                e.preventDefault();
            }
        });
        drop_area.ondrop=function(e){
            e.preventDefault();
						var hid=$("#hid").val();
						console.log(hid);
						
						var title=$("#title").val();
						console.log(title);
            var flist=e.dataTransfer.files;
            if(flist.length==0){
                return;
            }
            if(flist[0].type.indexOf("image")==-1){
                alert("拖动不是图片");
                return;
            }
            var img=window.webkitURL.createObjectURL(flist[0]);
            var pname=flist[0].name;
            var psize=Math.ceil(flist[0].size/1000);
            if(psize>2000){
                alert("图片太大");
                return;
            }
            var html=`
                <img src="${img}">
                <p>图片名称:${pname}</p>
                <p>图片大小:${psize}kb</p>
            `;
            $("#preview").html(html);
				
            var xhr=null;
            if(window.XMLHttpRequest){
                xhr = new XMLHttpRequest();
            }else{
                xhr = new ActiveXObject("Micsorft.XMLHttp");
            }
            xhr.open("post","data/comment_pic.php?hid="+hid+"&title="+title,true);
            xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");
						xhr.onstatechange=function(){
							console.log(xhr.responseText);
						}
            var fd=new FormData();
            fd.append("mypic",flist[0]);
            xhr.send(fd);
        }
