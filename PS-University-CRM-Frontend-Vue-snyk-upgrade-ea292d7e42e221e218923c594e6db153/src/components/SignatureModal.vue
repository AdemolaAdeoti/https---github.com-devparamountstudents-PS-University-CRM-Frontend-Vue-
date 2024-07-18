<template>
    <div class="px-3 row py-1">
        <div class="col-md-12 bg-light d-flex">
            <button :style="tab === 1 ? { borderBottom: '2px solid #FAC515' } : {}" @click="selectTab(1)"
                :disabled="tab == 1" class="d-flex flex-column btn  justify-content-center align-items-center">
                <img src="@/assets/images/pen.svg" alt="">
                <span>Draw</span>
            </button>
            <button :style="tab === 2 ? { borderBottom: '2px solid #FAC515' } : {}" @click="selectTab(2)"
                :disabled="tab == 2" class="d-flex flex-column btn justify-content-center align-items-center">
                <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M11.6171 11.0458C10.9022 11.7671 10.4478 12.7061 10.3257 13.7144H2.06286C1.81781 13.7113 1.58383 13.6119 1.41161 13.4375C1.2394 13.2632 1.14284 13.028 1.14286 12.7829V12.6458L4.77143 9.05721C5.04213 8.79403 5.39881 8.63752 5.77578 8.61652C6.15274 8.59552 6.5246 8.71144 6.82286 8.94293L7.74286 9.84578L7.81143 9.90293C7.99707 10.0364 8.21993 10.1082 8.44857 10.1082C8.67721 10.1082 8.90008 10.0364 9.08571 9.90293L12.0514 6.98864C12.4094 6.62505 12.8606 6.3671 13.3556 6.24312C13.8505 6.11913 14.37 6.13389 14.8571 6.28578C15.1638 6.38708 15.4501 6.54185 15.7029 6.74293L16.0114 7.04578V7.42864C16.0114 7.58019 16.0716 7.72554 16.1788 7.8327C16.286 7.93987 16.4313 8.00007 16.5829 8.00007C16.7344 8.00007 16.8798 7.93987 16.9869 7.8327C17.0941 7.72554 17.1543 7.58019 17.1543 7.42864V2.06293C17.1535 1.79031 17.0989 1.52053 16.9936 1.2691C16.8882 1.01767 16.7342 0.789538 16.5403 0.597834C16.3465 0.40613 16.1167 0.254629 15.8641 0.152044C15.6115 0.0494582 15.3412 -0.00218917 15.0686 7.11049e-05H2.06286C1.51668 0.00307215 0.993725 0.221372 0.607513 0.607584C0.221301 0.993796 0.00300105 1.51675 2.39276e-10 2.06293V12.7829C-8.31984e-06 13.3311 0.216962 13.857 0.603498 14.2456C0.990034 14.6343 1.5147 14.8542 2.06286 14.8572H10.3257C10.4576 15.8819 10.9326 16.8317 11.6735 17.5518C12.4143 18.272 13.3772 18.7199 14.4052 18.8226C15.4333 18.9253 16.4658 18.6768 17.3345 18.1175C18.2031 17.5582 18.8567 16.7212 19.1887 15.7428C19.5207 14.7645 19.5115 13.7025 19.1626 12.73C18.8137 11.7576 18.1457 10.932 17.2675 10.3878C16.3893 9.8437 15.3526 9.61308 14.3265 9.7336C13.3004 9.85412 12.3454 10.3187 11.6171 11.0515V11.0458ZM2.06286 1.14293H15.0686C15.1901 1.14218 15.3107 1.16538 15.4233 1.2112C15.5359 1.25703 15.6383 1.32459 15.7248 1.41002C15.8113 1.49545 15.8801 1.59708 15.9274 1.70911C15.9746 1.82113 15.9993 1.94136 16 2.06293V5.59436C15.7482 5.4355 15.4775 5.3088 15.1943 5.21721C14.5146 4.99803 13.788 4.96896 13.093 5.13313C12.398 5.29731 11.7612 5.64849 11.2514 6.14864L8.43429 8.92007L8.16572 8.65721L7.74286 8.24578C7.23488 7.75625 6.5569 7.48273 5.85143 7.48273C5.14596 7.48273 4.46797 7.75625 3.96 8.24578L1.14286 11.0401V2.06293C1.14436 1.81939 1.24177 1.58626 1.41398 1.41405C1.58618 1.24184 1.81932 1.14443 2.06286 1.14293ZM17.2743 16.7029C16.7946 17.182 16.1837 17.5082 15.5187 17.6402C14.8538 17.7722 14.1646 17.704 13.5383 17.4444C12.9121 17.1848 12.3768 16.7454 12.0003 16.1816C11.6237 15.6179 11.4227 14.9552 11.4227 14.2772C11.4227 13.5993 11.6237 12.9365 12.0003 12.3728C12.3768 11.8091 12.9121 11.3696 13.5383 11.11C14.1646 10.8504 14.8538 10.7823 15.5187 10.9142C16.1837 11.0462 16.7946 11.3724 17.2743 11.8515C17.5931 12.1699 17.846 12.5481 18.0185 12.9643C18.191 13.3805 18.2798 13.8266 18.2798 14.2772C18.2798 14.7278 18.191 15.1739 18.0185 15.5902C17.846 16.0064 17.5931 16.3845 17.2743 16.7029Z"
                        fill="black" />
                </svg>
                <span>Upload</span>
            </button>
        </div>        
        <div class="col-md-12">
            <div class="d-flex w-100 mb-3 row">
                <div v-if="tab == 1" class="col-md-12 py-4">
                    <div class="d-flex justify-content-between align-items-center ">
                        <h4>Signature</h4>
                        <span class="mx-1 text-info" @click="clearSignature" style="cursor: pointer;">Clear</span>
                    </div>
                    <div id="parentDiv" style="border: 1px dashed #ccc;height: 100px;" ref="signatureCanvas" width="100%"
                        height="150px"></div>
                    <div class="border d-none" style="width:100%;height:100px">
                        <img ref="signature" src="" alt="" />
                    </div>
                </div>
                <div v-if="tab == 2" class="col-md-12 py-4">
                    <div class="d-flex justify-content-between align-items-center ">
                        <h6 class="mb-2">Upload Image</h6>
                        <span class="mx-1 text-info" @click="$refs.file = null" style="cursor: pointer;">Clear</span>
                    </div>
                    <div @dragover="dragover" @dragleave="dragleave" @drop="drop"
                        class="mx-auto d-flex  justify-content-center align-items-center"
                        :style="'border:1px solid #bbb ;border-radius:20px;padding:25px;width:100%;height:150px;'">
                        <h6 v-if="isDragging" style="border:2px dashed #bbb; border-radius:10px; height:inherit;"
                            class="w-100 d-flex justify-content-center align-items-center">Draging</h6>
                        <div v-else class="w-75 text-center py-4">
                            <h6 class="text-center  text-secondary mb-1 mt-2">Drag and Drop</h6>
                            <p class="mb-2">or</p>
                            <button v-if="!signUrl" @click="$refs['file'].click()"
                                class="btn btn-warning mx-auto d-inline-block btn-sm">Choose Image</button>
                            <div v-else>
                                <img style="width:100px;height:50px" :src="signUrl" />
                            </div>
                        </div>
                        <input type="file" @change="onChange($event)" ref="file" accept=".png" style="display:none">
                    </div>
                </div>         
            </div>
            <div class="d-flex">
                <button class="btn btn-sm d-inline-block mx-1 btn-warning" style="width: 90px;"
                    @click="clearSignature">Cancel</button>
                <button style="width: 90px;" class="btn btn-sm d-inline-block mx-1 btn-warning"
                @click="useSignature">Ok</button>
            </div>
        </div>
        <div class="col-md-2"></div>
    </div>
</template>
    
<script>
import p5 from "p5";
import { useUserStore } from "@/stores/user";
var sketch = null;
export default {
    name: "signatureView",
    data() {
        return {
            tab: 1,
            store: useUserStore(),
            signUrl: null,
        };
    },
    methods: {

        dragover(e) {
            e.preventDefault();
            this.isDragging = true;
        },
        dragleave() {
            this.isDragging = false;
        },
        drop(e) {
            e.preventDefault();
            this.$refs.file.files = e.dataTransfer.files;
            const event = { target: this.$refs.file }
            this.onChange(event);
            this.isDragging = false;
        },
        selectTab(index) {
            this.tab = index
        },
        async onChange(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    const fileURL = URL.createObjectURL(file); // Create a URL for the file                 
                    this.signUrl = fileURL;
                };
                reader.onerror = (error) => {
                    console.log('FileReader error:', error);
                };
                await reader.readAsDataURL(file);
            }
        },
        async useSignature() {
            if (this.tab == 2) {
                this.$emit('getSign', this.signUrl)
            } else {
                await this.captureSignature()
                this.$emit('getSign', this.signUrl)
            }
        },
        initializeCanvas() {
            sketch = new p5(this.drawSignature, this.$refs.signatureCanvas);
        },
        drawSignature(p) {
            let drawing = false;
            let lastX = 0;
            let lastY = 0;

            p.setup = () => {
                const parentDiv = document.getElementById('parentDiv'); // Replace 'parentDiv' with the actual ID of the parent div
                p.createCanvas(parentDiv.clientWidth, 100);
                p.frameRate(3);
                p.strokeWeight(2);
                p.noFill();
                p.background(255);
            };

            p.mousePressed = () => {
                drawing = true;
                lastX = p.mouseX;
                lastY = p.mouseY;
            };

            p.mouseReleased = () => {
                drawing = false;
            };
            p.touchMoved = () => {
                p.line(p.mouseX, p.mouseY, lastX, lastY);
                lastX = p.mouseX;
                lastY = p.mouseY;
                return false;
            };
            p.draw = () => {
                if (drawing) {
                    p.line(lastX, lastY, p.mouseX, p.mouseY);
                    lastX = p.mouseX;
                    lastY = p.mouseY;
                    return false;
                }
            };
        },
        clearSignature() {
            sketch.clear();
            sketch.background(255);
        },
        getSignatureData() {
            return this.$refs.signatureCanvas.toDataURL();
        },
        async captureSignature() {                        
            const canvas = this.$refs.signatureCanvas.getElementsByTagName('canvas')[0];                        
            this.signUrl = canvas.toDataURL();
        },
        removeImageBlanks(imageObject) {
            let imgWidth = imageObject.width;
            let imgHeight = imageObject.height;
            var canvas = document.createElement('canvas');
            canvas.setAttribute("width", imgWidth);
            canvas.setAttribute("height", imgHeight);
            var context = canvas.getContext('2d');
            context.drawImage(imageObject, 0, 0);

            var imageData = context.getImageData(0, 0, imgWidth, imgHeight),
                data = imageData.data,
                getRBG = function (x, y) {
                    var offset = imgWidth * y + x;
                    return {
                        red: data[offset * 4],
                        green: data[offset * 4 + 1],
                        blue: data[offset * 4 + 2],
                        opacity: data[offset * 4 + 3]
                    };
                },
                isWhite = function (rgb) {
                    // many images contain noise, as the white is not a pure #fff white
                    return rgb.red > 200 && rgb.green > 200 && rgb.blue > 200;
                },
                scanY = function (fromTop) {
                    var offset = fromTop ? 1 : -1;

                    // loop through each row
                    for (var y = fromTop ? 0 : imgHeight - 1; fromTop ? (y < imgHeight) : (y > -1); y += offset) {

                        // loop through each column
                        for (var x = 0; x < imgWidth; x++) {
                            var rgb = getRBG(x, y);
                            if (!isWhite(rgb)) {
                                if (fromTop) {
                                    return y;
                                } else {
                                    return Math.min(y + 1, imgHeight);
                                }
                            }
                        }
                    }
                    return null; // all image is white
                },
                scanX = function (fromLeft) {
                    var offset = fromLeft ? 1 : -1;

                    // loop through each column
                    for (var x = fromLeft ? 0 : imgWidth - 1; fromLeft ? (x < imgWidth) : (x > -1); x += offset) {

                        // loop through each row
                        for (var y = 0; y < imgHeight; y++) {
                            var rgb = getRBG(x, y);
                            if (!isWhite(rgb)) {
                                if (fromLeft) {
                                    return x;
                                } else {
                                    return Math.min(x + 1, imgWidth);
                                }
                            }
                        }
                    }
                    return null; // all image is white
                };

            var cropTop = scanY(true),
                cropBottom = scanY(false),
                cropLeft = scanX(true),
                cropRight = scanX(false),
                cropWidth = cropRight - cropLeft,
                cropHeight = cropBottom - cropTop;

            canvas.setAttribute("width", cropWidth);
            canvas.setAttribute("height", cropHeight);
            // finally crop the guy
            canvas.getContext("2d").drawImage(imageObject,
                cropLeft, cropTop, cropWidth, cropHeight,
                0, 0, cropWidth * 0.50, cropHeight * 0.50);

            return canvas.toDataURL();
        }
    },
    mounted() {
        this.initializeCanvas();
    },
};
</script>
    