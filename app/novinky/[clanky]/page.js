import { GiNewspaper } from "react-icons/gi";

export default function page () {

    const editorContent = `
<h1>Javorn&iacute;ky 2024 - Memori&aacute;l Jardy Vacul&iacute;ka a V&aacute;clava Tichavsk&eacute;ho</h1> <p><strong>POZOR, LETOS ZMĚNA TRASY!</strong></p> <p>Term&iacute;n:&nbsp;<strong>9. listopadu 2024</strong></p> <p>Start:&nbsp;<strong>10,30h @ Huslenky, Kychov&aacute;</strong>&nbsp;&ndash; točna autobusu, 49.2765047N, 18.1480281E</p> <p>C&iacute;l:&nbsp;<strong>Kas&aacute;rna, chata Bačk&aacute;rka</strong></p> <p>D&eacute;lka: 20,5km s přev&yacute;&scaron;en&iacute;m 788m</p> <p>Trasa:&nbsp;<a href="https://mapy.cz/s/fuzomahoda" target="_blank" rel="noopener">https://mapy.cz/s/fuzomahoda</a></p> <p>Popis trasy: Ze startu&nbsp;<strong>po žlut&eacute; na Papajsk&eacute; sedlo</strong>&nbsp;(3km),&nbsp;<strong>odboč doleva na červenou</strong>&nbsp;(na sever)&nbsp;<strong>přes Krkostěnu</strong>&nbsp;(užij si ji pln&yacute;mi dou&scaron;ky) a pokračuj&nbsp;<strong>po červen&eacute;&nbsp;n&aacute;dhernou hřebenovkou</strong>&nbsp;až za Stratenec&nbsp;<strong>do sedla Gežov</strong>&nbsp;(18km od startu), tady opět&nbsp;<strong>doleva po žlut&eacute; na Kas&aacute;rna</strong>&nbsp;na sjezdovku (20,3km od startu) a seběhem, v&aacute;len&iacute;m sudů nebo žab&aacute;ky po n&iacute; 400m dolů&nbsp;<strong>na Bačk&aacute;rku</strong>. Na Bačk&aacute;rce je možn&eacute; se za 100 Kč osprchovat.</p> <p>Chata je slovensk&aacute;, ale berou i na&scaron;i tvrdou měnu.</p> <p>Pros&iacute;m, pokud to zvl&aacute;dnete, převl&eacute;kejte se venku, ať nemaj&iacute; uvnitř půlku Javorn&iacute;ků. Pro převozn&iacute;ky aut: u Bačk&aacute;rky je mal&eacute; parkovi&scaron;tě, pokud bude pln&eacute;, vyjeďte nad Bačk&aacute;rku ke star&eacute;mu objektu kas&aacute;ren, nechte tam auto a seběhněte dolů. Vchod do hospody je shora!</p> <p>Na chatě je možnost levn&eacute;ho ubytov&aacute;n&iacute;.</p> <p>Tě&scaron;&iacute;m se na viděnou.</p> <p>Huň&aacute;č</p> <p>tel.: 737 542 498</p> <p>e-mail: info@khszlin.com</p>
    `


    return (
        <div className="flex min-h-screen w-full flex-col">
            <div className=" flex-shrink flex flex-row justify-center">
                <div className="border-b-[1px] flex-row flex mb-8 border-b-gray-300 dark:border-b-gray-700">
                    <div className="mb-1">
                        <GiNewspaper className="text-gray-600 w-8 h-8 mr-3 dark:text-gray-200" />
                    </div>
                    <div>
                        <span className="text-2xl text-gray-800 dark:text-gray-200   ">Na skály v úterý</span>
                    </div>
                </div>

            </div>
        
        <div className="flex flex-col justify-center">
            <div className="flex justify-center">
                <span>vytvořeno: 10.15.2024</span>
            </div>
            <div className="flex text-start mx-2 md:mx-4 lg:mx-16 text-gray-800 ">
            <div dangerouslySetInnerHTML={{ __html: editorContent }} />
            </div>


        
        </div>
      </div>
    )
}