const canvas = document.getElementById("clock") as HTMLCanvasElement | null;

if (canvas) {
    const ctx = canvas.getContext("2d");
    if (ctx) {
        canvas.width = 400;
        canvas.height = 400;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        function circularPosition(radius: number, angle: number) {
            const radians = (angle - 90) * (Math.PI / 180);
            return {
                x: centerX + radius * Math.cos(radians),
                y: centerY + radius * Math.sin(radians),
            };
        }

        function drawClock() {
            const now = new Date();
            const seconds = now.getSeconds();
            const minutes = now.getMinutes();
            const hours = now.getHours() % 12;

            const secondAngle = (seconds / 60) * 360;
            const minuteAngle = (minutes / 60) * 360;
            const hourAngle = (hours / 12) * 360 + (minutes / 60) * 30;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#e3f2fd";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.beginPath();
            ctx.arc(centerX, centerY, 180, 0, 2 * Math.PI);
            ctx.strokeStyle = "#1976d2";
            ctx.lineWidth = 6;
            ctx.stroke();

            ctx.font = "24px Arial";
            ctx.fillStyle = "#1976d2";
            for (let i = 1; i <= 12; i++) {
                const angle = (i / 12) * 360;
                const pos = circularPosition(160, angle);
                ctx.fillText(i.toString(), pos.x - 10, pos.y + 10);
            }

            function drawHand(length: number, angle: number, width: number, color: string) {
                const pos = circularPosition(length, angle);
                ctx.strokeStyle = color;
                ctx.lineWidth = width;
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(pos.x, pos.y);
                ctx.stroke();
            }

            drawHand(140, secondAngle, 2, "#d32f2f");
            drawHand(110, minuteAngle, 4, "#1976d2");
            drawHand(80, hourAngle, 6, "#0d47a1");

            ctx.beginPath();
            ctx.arc(centerX, centerY, 8, 0, 2 * Math.PI);
            ctx.fillStyle = "#1976d2";
            ctx.fill();

            requestAnimationFrame(drawClock);
        }

        drawClock();
    } else {
        console.error("Canvas rendering context not found.");
    }
} else {
    console.error("Canvas element not found.");
}