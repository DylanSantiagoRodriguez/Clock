var CircularList = /** @class */ (function () {
    function CircularList(items) {
        this.items = items;
        this.index = 0;
    }
    CircularList.prototype.next = function () {
        var item = this.items[this.index];
        this.index = (this.index + 1) % this.items.length;
        return item;
    };
    CircularList.prototype.current = function () {
        return this.items[this.index];
    };
    return CircularList;
}());
var canvas = document.getElementById("clock");
if (canvas) {
    var ctx_1 = canvas.getContext("2d");
    if (ctx_1) {
        canvas.width = 400;
        canvas.height = 400;
        var centerX_1 = canvas.width / 2;
        var centerY_1 = canvas.height / 2;
        var hoursList_1 = new CircularList(Array.from({ length: 12 }, function (_, i) { return i + 1; }));
        var anglesList_1 = new CircularList([0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]);
        function circularPosition(radius, angle) {
            var radians = (angle - 90) * (Math.PI / 180);
            return {
                x: centerX_1 + radius * Math.cos(radians),
                y: centerY_1 + radius * Math.sin(radians),
            };
        }
        function drawClock() {
            var now = new Date();
            var seconds = now.getSeconds();
            var minutes = now.getMinutes();
            var hours = now.getHours() % 12;
            var secondAngle = (seconds / 60) * 360;
            var minuteAngle = (minutes / 60) * 360;
            var hourAngle = (hours / 12) * 360 + (minutes / 60) * 30;
            ctx_1.clearRect(0, 0, canvas.width, canvas.height);
            ctx_1.fillStyle = "#e3f2fd";
            ctx_1.fillRect(0, 0, canvas.width, canvas.height);
            ctx_1.beginPath();
            ctx_1.arc(centerX_1, centerY_1, 180, 0, 2 * Math.PI);
            ctx_1.strokeStyle = "#1976d2";
            ctx_1.lineWidth = 6;
            ctx_1.stroke();
            ctx_1.font = "24px Arial";
            ctx_1.fillStyle = "#1976d2";
            for (var i = 0; i < 12; i++) {
                var hour = hoursList_1.next();
                var angle = anglesList_1.next();
                var pos = circularPosition(160, angle);
                ctx_1.fillText(hour.toString(), pos.x - 10, pos.y + 10);
            }
            function drawHand(length, angle, width, color) {
                var pos = circularPosition(length, angle);
                ctx_1.strokeStyle = color;
                ctx_1.lineWidth = width;
                ctx_1.beginPath();
                ctx_1.moveTo(centerX_1, centerY_1);
                ctx_1.lineTo(pos.x, pos.y);
                ctx_1.stroke();
            }
            drawHand(140, secondAngle, 2, "#d32f2f");
            drawHand(110, minuteAngle, 4, "#1976d2");
            drawHand(80, hourAngle, 6, "#0d47a1");
            ctx_1.beginPath();
            ctx_1.arc(centerX_1, centerY_1, 8, 0, 2 * Math.PI);
            ctx_1.fillStyle = "#1976d2";
            ctx_1.fill();
            requestAnimationFrame(drawClock);
        }
        drawClock();
    }
    else {
        console.error("Canvas rendering context not found.");
    }
}
else {
    console.error("Canvas element not found.");
}
