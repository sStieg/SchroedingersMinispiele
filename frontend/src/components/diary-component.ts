import {html, render} from "lit-html";

console.log("diary-component")

const template = () => html`
<div>
<p>Als Kind mochte ich schon immer Rätsel. Ich hatte sie alle! Sie waren überall in den Zeitschriften verstreut, die ich jeden Monat bekam. Da saß ich also ganz allein auf dem Boden meines Schlafzimmers.\n\nEs ist komisch, dass ich mich gerade erst daran erinnere. Die Jahre vergingen und als ich berühmt wurde, schien meine Einsamkeit einfach zu verschwinden. Die einzigen Stunden, die ich wirklich alleine verbrachte, waren, wenn ich schlief oder an meinen Arbeiten arbeitete, aber in diesen Zeiten fühlte ich mich nicht einsam.\n\nMeine Wissenschaft leistete mir immer gute Gesellschaft. Oft vergingen Tage, bis mir klar wurde, dass ich weder geschlafen noch gegessen hatte. Es gab nur meine Bücher, meine Schreibmaschine und mich.\nDiese Werke sollten mich berühmt machen, und das taten sie auch. Ein Werk nach dem anderen gewann Preise. Kein Wunder, schließlich habe ich nicht nur das geschrieben, was ich aus Büchern wusste, wie all diese Möchtegern-Wissenschaftler, sondern hatte auch zwei geniale Strategien.\n\n1. Fassen Sie das Gelernte in einem völlig neuen Konzept zusammen.\n2. Versuchen Sie es, versuchen Sie es.\nIch habe alle meine Experimente selbst durchgeführt. Die Blätter auf meinem Tisch waren gefüllt mit Skizzen, Daten und Fakten. Es lief nicht immer alles nach Plan, das musste ich zugeben, aber was wäre schon eine kleine Explosion im Keller, wenn einem nicht das Dach auf den Kopf fiel?\n\nHeute stand ich also wieder hier, vor dem Kinderzimmer. Das Haus meiner Eltern war nicht besonders groß, nicht besonders protzig, aber es war ein Zuhause. Die Zimmer habe ich kaum genutzt, die meiste Zeit habe ich in Hotels am anderen Ende der Stadt geschlafen und als ich zurückkam, war es einsam wie immer. Manchmal stelle ich mir vor, ihre Stimmen zu hören, wenn ich daran denke, das Haus zu verkaufen.\nAber Mutter! Keine Sorge, ich bin noch nicht bereit.</p>
</div>
`

class DiaryComponent extends HTMLElement{
    connectedCallback(){
        console.log("connected")
        this.render()
    }

    render() {
        render(template(), this)
    }
}
customElements.define("diary-component", DiaryComponent);