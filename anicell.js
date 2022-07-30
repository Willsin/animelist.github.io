    class AniCell extends HTMLElement {
      connectedCallback() { 
        this.title = this.getAttribute('title') || undefined
        this.pic_url = this.getAttribute('pic_url') || undefined
        this.update = this.getAttribute('update') || undefined
        this.episode = this.getAttribute('episode') || undefined
        this.render()
      }
      disconnectedCallback() {}

      static get observedAttributes() {
        return ['title', 'pic_url', 'update', 'episode']
      }

      attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue || undefined
      }
      adoptedCallback() {}

      render() {
        this.innerHTML = `
          <div class="ani-cell">
            <div class="ani-wrapper">
              <div class="ani-img-wrapper">
                <img class="ani-img" src="${ this.pic_url }" alt="">
              </div>
              <div class="ani-text">
                <span class="ani-title" contenteditable="true">${ this.title }</span>
                <span class="ani-description" contenteditable="true">更新至第 ${ this.episode } 集</span>
                <span class="ani-description" contenteditable="true">${ this.update }</span>
              </div>
            </div>
          </div>
        `
      }
    }

    customElements.define('ani-cell', AniCell)