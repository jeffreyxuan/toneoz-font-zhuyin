/**
* 曉聲通注音字典 分析中文文句中「一」「不」，輸出經過變調後的聲調
* Chinese Yi / Bu tone sandhi parse function
* by ToneOZ.com Zhuyin Dictionary htts://toneoz.com/ime
* License : MIT. Free for persoanl and commercial use.
* input example : 等(a) 一(b) 下(c)
* usage example :
*   let tone = getybnewtone({"prevybval":"等",
*                 "prevybtone":3,
*                 "ybval":"一",
*                 "nextybval":"下",
*                 "nextybtone":4,
*                 });
* @param {param} a JSON object contains the following parameters
* @param {prevybval} chinese char of (a) : e.g.: 等
* @param {prevybtone} 1 to 5, the tone of (a)
* @param {ybval} chinese char of (b) : e.g.: 一
* @param {nextybval} chinese char of (c) : e.g.: 下
* @param {nextybtone} 1 to 5, the tone of (c)
* @return {isyb} true : (b) is "一" or "不"
* @return {newybtone} 1 to 5, the sandhi tone of (b)
*/
function getybnewtone(param){
    let {ybval, prevybval, nextybval, prevybtone, nextybtone} = param;
    let isyb = false;
    let newybtone = null;
    if(ybval == "一" || ybval == "不"){
        isyb = true;                        
        
        if(ybval == "一"){
            // (1) 「一」字本是第一聲，在以下三種情況，應將「一」讀作原調。
            // (i)              單唸 e.g. 一
            // (ii)            詞尾 e.g. 純一、萬一、星期一
            // (iii)          表示序數時 e.g. 一九九一、第一座
            // (2) 除以上特別情況，其餘有「一」字的詞語大都需要變調。					
            // (i) 如果「一」字在第一聲、第二聲或第三聲的字前，需將「一」字讀第四聲。 e.g. 一天(tiān)、一年(nián)、一起(xĭ)
            // (ii) 如果「一」字在第四聲的字前，需將「一」字讀第二聲。 e.g. 一定(dìng)、一片(piàn)、一樣(yàng)
            if(
                (nextybval == "是")|| // (iii)   一是     表示序數時 e.g. 一九九一、第一座
                (nextybval == "日")|| // (iii)   一日     表示序數時 e.g. 一九九一、第一座
                (nextybval == "月")|| // (iii)   一月     表示序數時 e.g. 一九九一、第一座
                (nextybval == "個")||(nextybval == "个")|| // (iii)   一個     表示序數時
                (prevybval == "第")|| // (iii)   第一     表示序數時 e.g. 一九九一、第一座
                (prevybval == "说")|| // (iii)   説一     表示序數時 e.g. 一九九一、第一座
                (prevybval == "説")|| // (iii)   説一     表示序數時 e.g. 一九九一、第一座
                (prevybval == "唯")|| // (iii)   唯一     表示序數時 e.g. 一九九一、第一座
                (prevybval == "惟")|| // (iii)   惟一     表示序數時 e.g. 一九九一、第一座
                (prevybval == "统")|| // (iii)   統一     表示序數時 e.g. 一九九一、第一座
                (prevybval == "統")|| // (iii)   統一     表示序數時 e.g. 一九九一、第一座
                (prevybval == "獨")|| // (iii)   独一     表示序數時 e.g. 一九九一、第一座
                (prevybval == "独")|| // (iii)   独一     表示序數時 e.g. 一九九一、第一座
                (prevybval == "劃")|| // (iii)   劃一     表示序數時 e.g. 一九九一、第一座
                (prevybval == "划")|| // (iii)   划一     表示序數時 e.g. 一九九一、第一座
                (nextybval == "的")|| // (iii)   一的     表示序數時 e.g. 一九九一、第一座
                (nextybval == "或")|| // (iii)   一或二     表示序數時 e.g. 一九九一、第一座
                (prevybval == "十")||(prevybval == "九")||(prevybval == "八")||
                (prevybval == "七")||(prevybval == "六")||(prevybval == "五")||
                (prevybval == "四")||(prevybval == "三")||(prevybval == "二")||
                (prevybval == "〇")||(prevybval == "零")||
                (nextybval == "十")||(nextybval == "九")||(nextybval == "八")||
                (nextybval == "七")||(nextybval == "六")||(nextybval == "五")||
                (nextybval == "四")||(nextybval == "三")||(nextybval == "二")||
                (nextybval == "〇")||(nextybval == "零")// (iii)   表示序數時 e.g. 一九九一、第一座
                ){
                newybtone = 1;
            } else if(nextybtone){
                if(nextybtone == 1 || nextybtone == 2 || nextybtone == 3){
                    newybtone = 4;
                } else if(nextybtone == 4 || nextybtone == 5){
                    newybtone = 2;
                }
            }
            if(newybtone == null){
                newybtone = 1;
            }
        } else if(ybval == "不"){
            // (1)   「不」字本是第四聲，在以下三種情況，應將「不」讀作原調。
            // (i)              單唸 e.g. 不
            // (ii)            詞尾e.g. 從不、絕不
            // (iii)          在第一聲、第二聲或第三聲的字前 e.g. 不該(gāi)、不來(lái)、不管(guăn)
            // (2)   如果「不」字在第四聲的字前，需將「不」字讀第二聲。 e.g. 不要(yào)、不用(yòng)、不對(dùi)            
            if(nextybtone && (nextybtone == 1 || nextybtone == 2 || nextybtone == 3 || nextybtone == 5)){
                newybtone = 4;
            } else if(nextybtone && (nextybtone == 4)){
                newybtone = 2;
            }
            if(newybtone == null){
                newybtone = 4;
            }
        }
    }

    return{
        newybtone : newybtone
        , isyb : isyb
    };
}