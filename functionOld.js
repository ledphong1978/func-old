// functionOld.js  (Global function)
// © 2025 Ledphong 
// [Update 2026-07-02] 

function functionOld(start, end) {

    // --- แปลงไทยเป็น Date ---
    const toAD = d => {
        let [dd,mm,yy] = d.split('/').map(Number);
        return new Date(yy-543, mm-1, dd);
    };

    let s = toAD(start), e = toAD(end);

    // --- เงื่อนไข: 1 ต.ค. → เลื่อนเป็น 30 ก.ย. ---
    if (s.getMonth()===9 && s.getDate()===1) s.setDate(s.getDate()-1);

    // --- คำนวณอายุ (รองรับ 29 ก.พ.) ---
    let y = e.getFullYear() - s.getFullYear();

   // รองรับ 29 ก.พ.
   let birthDay = s.getDate();

    if (s.getMonth() === 1 && s.getDate() === 29) {
      const leap =
        (e.getFullYear() % 4 === 0 && e.getFullYear() % 100 !== 0) ||
        (e.getFullYear() % 400 === 0);

       birthDay = leap ? 29 : 28;
    }

    const birthThisYear = new Date(
       e.getFullYear(),
       s.getMonth(),
       birthDay
    );

    if (e < birthThisYear) {
       y--;
    }

    // --- startMon ---
    let sm = ((s.getMonth() + (s.getDate()===1?1:2) - 1) % 12) + 1;

    // --- เงินรายเดือน ---
    const myFunction = (a,sm)=>{
        const lvl = a>=90?1000:a>=80?800:a>=70?700:a>=60?600:0;
        const sp = {59:600,69:700,79:800,89:1000};
        let m = Array(12).fill(lvl);
        if (sp[a] && sm!==10) for (let i=(sm+2)%12;i<12;i++) m[i]=sp[a];
        return m;
    };

    let money = myFunction(y, sm);
    let total = money.reduce((x,v)=>x+v,0);

    return [y, sm, ...money, total];
}

// ✅ Export ให้เรียกใช้ได้ใน HTML
window.functionOld = functionOld;
