import { useEffect, useRef } from "react";

type MatrixRainProps = {
    isBackground?: boolean;
};

const MatrixRain: React.FC<MatrixRainProps> = ({ isBackground = true }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        
        const characters = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜMATRIXmatrix0123456789@#$%&*+-/=?|<>〜♪†‡Ωµ©®™¥£¢°§¶⋅･…‥∶〃〆々〻゠␀␁␠␦".split("");
        const fontSize = 25;
        const columns = Math.floor(canvas.width / fontSize);
        const drops = Array(columns).fill(1);
        
        const drawMatrix = () => {
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = "#0F0";
            ctx.font = `${fontSize}px monospace`;
            
            for (let i = 0; i < drops.length; i++) {
                const text = characters[Math.floor(Math.random() * characters.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };
        
        const interval = setInterval(drawMatrix, 50);
        
        return () => {
            clearInterval(interval);
            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);
    
    return (
        <canvas
            ref={canvasRef}
            style={{
                display: "block",
                position: isBackground ? "absolute" : "relative",
                top: isBackground ? 0 : "auto",
                left: isBackground ? 0 : "auto",
                width: "100%",
                height: "100%",
                background: "black",
                zIndex: isBackground ? -1 : "auto",
            }}
        />
    );
};

export default MatrixRain;
