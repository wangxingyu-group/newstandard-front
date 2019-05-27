// bip sound
// http://soundbible.com/mp3/A-Tone-His_Self-1266414414.mp3

(function(factory) {
  // checking for exports avalible
  if (typeof module !== 'undefined' && module.exports) {
    // export Collection
    module.exports = factory
  } else {
    // else add to root variable
    window['naranja'] = factory
  }
})(function() {
  function setSideUpAnimation(finalNotification) {
    setTimeout(function() {
      var notificaciónHeight = finalNotification
        .querySelector('.naranja-body-notification')
        .offsetHeight

      finalNotification.style.height = notificaciónHeight + 'px'
    }, 0)
  }

  function createText(text) {
    return document.createTextNode(text)
  }

  /**
   * provide a reusable way to create html
   * elements
   * @param tag String – html tag name
   * @param classes Array<String> – html tag classes
   */

  function createElement(tag, classes) {
    var $HTMLElement = document.createElement(tag)
    if (classes) {
      classes.forEach(function(className) {
        $HTMLElement.classList.add(className)
      })
    }

    return $HTMLElement
  }

  var $narjContainer = document.querySelector('.naranja-notification-box')

  let $newNotificationsAdvice
  if (!$narjContainer) {
    $narjContainer = createElement('div', ['naranja-notification-box'])
    $newNotificationsAdvice = createElement('div', ['naranja-notification-advice'])
    $newNotificationsAdvice.addEventListener('click', function() {
      $narjContainer.scrollTop = '0'
    })
    $narjContainer.appendChild($newNotificationsAdvice)

    document.body.appendChild($narjContainer)
  }

  $narjContainer.__proto__.unshifElement = function(node) {
    this.insertBefore(node, this.childNodes[0])
  }

  $narjContainer.addEventListener('scroll', function(e) {
    if (e.currentTarget.scrollTop < 20) {
      $newNotificationsAdvice.classList.remove('active')
    }
  })

  return {
    log: function(argm) {
      this.createNotification('log', argm)
    },
    success: function(argm) {
      this.createNotification('success', argm)
    },
    warn: function(argm) {
      this.createNotification('warn', argm)
    },
    error: function(argm) {
      this.createNotification('error', argm)
    },

    /*
    * Internal methods for
    * launch notifications
    */
    createNotification: function(type, argm) {
      this.type = type
      this.title = argm.title
      this.text = argm.text
      this.icon = (argm.icon === undefined) ? true : argm.icon
      this.buttons = argm.buttons

      var $notification = this.$createContainer()
      var $body = $notification.querySelector('div')

      this.$notification = $notification
      this.$body = $body

      // $body.append("<el-button>asdasd</el-button>")

      // render icon if exists
      this.icon = true
      if (this.icon) {
        var $iconContainer = createElement('div', [
          'naranja-icon',
          'narj-icon-' + type
        ])

        // $iconContainer.innerHTML = this.chooseIcon[type]
        $iconContainer.innerHTML = this.chooseIcon['log']

        $body.appendChild($iconContainer)
      }

      var $title = this.createTitle()
      // // var $text = this.createText()

      var $textAndTitleContainer = createElement('div', [
        'naranja-text-and-title'
      ])

      $textAndTitleContainer.appendChild($title)
      // // $textAndTitleContainer.appendChild($text)

      $body.appendChild($textAndTitleContainer)

      // render buttons fragment if exists
      if (this.buttons) {
        var $buttons = this.createButtons($notification, $body)

        $body
          .querySelector('.naranja-text-and-title')
          .appendChild($buttons)
      }

      var $close = createElement('div', [
        'naranja-close-icon'
      ])

      $close.addEventListener('click', function() {
        this.closeNotification()
      }.bind(this))

      // var $close = document.createElement('div')
      // $close.classList.add('naranja-close-icon')
      $close.innerHTML = this.chooseIcon.close

      $body.appendChild($close)

      $narjContainer.unshifElement($notification)
      setSideUpAnimation($notification)

      if ($narjContainer.scrollTop > 20) {
        $newNotificationsAdvice.classList.add('active')
        $newNotificationsAdvice.innerHTML = this.chooseIcon.newNotification
      }

      if (argm.timeout !== 'keep') {
        setTimeout(
          function() {
            this.closeNotification()
          }.bind(this),
          argm.timeout || 5000
        )
      }
    },
    $createContainer: function() {
      // generate box for notification

      var $container = createElement('div', [
        'naranja-notification',
        'naranja-' + this.type
      ])

      var $innerContainer = createElement('div', [
        'naranja-body-notification',
        'narj-' + this.type
      ])

      $container.appendChild($innerContainer)

      return $container
    },
    createTitle: function() {
      var $parragraph = createElement('p', [
        'naranja-title'
      ])
      var $tt = createText(this.title)
      $parragraph.appendChild($tt)
      // 动画
      var $iconContainer = createElement('div', [
        'naranja-icon',
        'narj-icon-' + 'log'
      ])
      // $iconContainer.innerHTML = this.chooseIcon['log']
      $parragraph.append($iconContainer)

      return $parragraph
    },
    createText: function() {
      var $title = createElement('p', [
        'naranja-parragraph'
      ])

      var $tx = document.createTextNode(this.text)
      $title.appendChild($tx)

      return $title
    },
    createButtons: function($notification, $body) {
      var $buttonsContainer = createElement('div', [
        'naranja-buttons-container'
      ])

      var self = this

      this.buttons.forEach(function(button) {
        var $buttonElement = createElement('button')
        $buttonElement.appendChild(document.createTextNode(button.text))

        $buttonElement.addEventListener('click', function(event) {
          self.removeNotification = true
          event.preventClose = function() {
            self.removeNotification = false
          }

          event.closeNotification = function() {
            self.closeNotification()
          }

          button.click(event)

          if (self.removeNotification) self.closeNotification()
        })

        $buttonsContainer.appendChild($buttonElement)
      })

      return $buttonsContainer
    },
    closeNotification: function() {
      var self = this
      if (!this.elementWasRemoved) {
        self.$body.style.opacity = '0'
        setTimeout(function() {
          self.$body.style.marginTop = '0px'
          self.$body.style.marginBottom = '0px'
          self.$body.style.padding = '0px'
          self.$notification.style.height = 0 + 'px'
          self.$notification.style.padding = 0 + 'px'
          setTimeout(function() {
            self.$notification
              .parentNode
              .removeChild(
                self.$notification
              )
          }, 600)
          if ($narjContainer.scrollTop < 20) {
            $newNotificationsAdvice.classList.remove('active')
          }
        }, 150)
      }
      this.elementWasRemoved = true
    },
    chooseIcon: {
      // log: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="24" fill="#EEEEEE"/><path d="M26.595 37.5C26.3313 37.9546 25.9528 38.332 25.4973 38.5943C25.0419
      // 38.8566 24.5256 38.9947 24 38.9947C23.4744 38.9947 22.9581 38.8566 22.5027 38.5943C22.0472 38.332 21.6687 37.9546 21.405 37.5M39 31.5H9C10.1935 31.5 11.3381 31.0259 12.182 30.182C13.0259 29.3381 13.5 28.1935 13.5 27V19.5C13.5 16.7152 14.6062 14.0445 16.5754 12.0754C18.5445 10.1062 21.2152 9 24 9C26.7848 9 29.4555 10.1062 31.4246 12.0754C33.3938 14.0445 34.5 16.7152 34.5 19.5V27C34.5 28.1935 34.9741 29.3381 35.818 30.182C36.6619 31.0259 37.8065 31.5 39 31.5V31.5Z" stroke="black" stroke-opacity="0.73" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      log: '<svg width="64" height="64" viewBox="0 0 512 512" fill="none" \n' +
        '\txmlns="http://www.w3.org/2000/svg" \n' +
        '\txmlns:xlink="http://www.w3.org/1999/xlink">\n' +
        '\t<g >\n' +
        '\t\t<defs>\n' +
        '\t\t\t<path id="SVGID_1_" d="M84.1,47.1l128,126l-64,66c0,0,19,57,125,126l64-66l128,126l-49,55c0,0-33,32.1-65,32.1c0,0-47,3.9-95-27.1\n' +
        '\t\t\tc0,0-88-52-131-97c0,0-106.1-120-125.1-199v-32c0,0,2.1-23,23.1-54L84.1,47.1z"/>\n' +
        '\t\t</defs>\n' +
        '\t\t<g >\n' +
        '\t\t\t<image style="overflow:visible;" width="256" height="256" xlink:href="data:image/png;base64,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" transform="matrix(2.0005 0 0 2.0005 0 0)">\n' +
        '\t\t\t</image>\n' +
        '\t\t</g>\n' +
        '\t</g>\n' +
        '\t<g >\n' +
        '\t\t<defs>\n' +
        '\t\t\t<path id="SVGID_3_" d="M286.1,180.7v28c0,0,13.4,0,18,18h28C332.1,226.7,332.7,185.4,286.1,180.7z"/>\n' +
        '\t\t</defs>\n' +
        '\t\t<g >\n' +
        '\t\t\t<image style="overflow:visible;opacity:0.75;" width="44" height="67" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAABECAYAAAAV4bwIAAAACXBIWXMAAAWJAAAFiQFtaJ36AAAA GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA6xJREFUeNrU2MtrE0EYAPBvdifJ pmmSGrRCKYJC60FQED2I4FEvPYh48uZBQVAEL0XEm6d6KNSDf4CHQu1RBQ/ioRTtQYqFHlrRW1u0 FWmb7Dv7OZtkwhKSfWVTdj4YyGN28svON68FEDAIKwVWJFYcVlRW0Kd+lpVc67XOiuVT120zH6Ht 0CGJBgYRwTw9iEhgjgaRwEHoVIL90KkF8x88SnBuEOhBg7NJo4UAu0G7NDpIsJ7UQDxKsJXUnY4M Pr2y9YKWK7eJRHYQYYd9tg0EvxC03m2eLe0NEuxNjzDgoVbPOLR8DIGQMQYea9dAch8hW5/Y0Jfx cP/9wceFt3+ePdpLGszTIxMF7KbExKY+y5LicbfKaBqAlukmTRUonVXoyMz6OVJNep4OC64H5XAb 7F6gKMOSkn9uUuPX5Ib+EBBJkuiwYC00OKcAoRn+1Ql20auJTWPx/HcsDBKdFNgbtzTFWD7zUzvV GtBFVoYDbhwf0MVWob3QgwDzuFDf11ZLi2s3W22qrXESZsp0HXY39CDBYNZU2NrVK2rx+JvK0u5k HHAn+ijAYDOmncnLVZJbGl0+HI0K9qIjgR21KscFQ46lsySBaePQAcG1qGDvwTY02G0UNVXuB8xD N/FkeaU6FwUMccC80X7BPGqm86DyFUthwRwdGSwNl+wkwG7YdaSWsbsQFszRkcBur7K77CQBboRl QE21rxdm5sdDgNvzdCRw0OYnKhgsCxy2xNOrN56EAOc5OjIYSW7acaRLBPAee/uhH3DzVxQwCZ0K Aw56hBD6DrNd35R5WHu9vWeMWzHAIFO20wWoFOnY34uFHR+wO88aUhIp8WNS+fRvbf1OHVmvxQA3 eo/1t23h0yBwr71H1BOH2yg9uHtttVguvIwD5sH+9OUgcDd0LDDf/OxfKU/ns+R3HHBjpUUcDQJ3 ovsC880PlaVvccBNNIwEgb3oRMBuyAQ/xwE30sO0CkFg3g2JgZvLuzxfdKA5fRmahGAQ9xRK8gUH aKb39GpbBLWaagWA+ZRXTAocdbcWZtD5HbdEATe8cgshCtjdkZqSYGAS9AghjeB6EDqNYM1vw5RW MPZCpxrcDZ16cCdaCLAXLQyYo4UC88oigYn3YCsKuH0aFwks8wtFAmPQMp5GsOq3jKcV7PRCpxrc DZ16cCdaCLAXLQyYVxQKzBsWCuydp0UBZ/kjBEcgcI4/QhAJDEHLeBrBut8ynlaw1QudanA3dOrB nWghwG78F2AA7tw432ctpHYAAAAASUVORK5CYII=" transform="matrix(2.0005 0 0 2.0005 260.0592 156.0355)">\n' +
        '\t\t\t\t<animate attributeType="CSS" attributeName="opacity" begin="0" dur="1" from="1" to="0" repeatCount="indefinite" />\n' +
        '\t\t\t</image>\n' +
        '\t\t</g>\n' +
        '\t</g>\n' +
        '\t<g >\n' +
        '\t\t<defs>\n' +
        '\t\t\t<path id="SVGID_5_" d="M286.1,120.1v30.7c0,0,66-8,75.3,76h30.7C392.1,226.7,398.7,130.7,286.1,120.1z"/>\n' +
        '\t\t</defs>\n' +
        '\t\t<g >\n' +
        '\t\t\t<image style="overflow:visible;opacity:0.5;" width="70" height="79" xlink:href="data:image/png;base64,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" transform="matrix(2.0005 0 0 2.0005 262.0597 92.0209)">\n' +
        '\t\t\t\t<animate attributeType="CSS" attributeName="opacity" begin="0.25" dur="1" from="1" to="0" repeatCount="indefinite" />\n' +
        '\t\t\t</image>\n' +
        '\t\t</g>\n' +
        '\t</g>\n' +
        '\t<g >\n' +
        '\t\t<defs>\n' +
        '\t\t\t<path id="SVGID_7_" d="M286.1,60.1v32c0,0,118-10,135.3,131h30C451.4,223.1,452.7,67.4,286.1,60.1z"/>\n' +
        '\t\t</defs>\n' +
        '\t\t<g >\n' +
        '\t\t\t<image style="overflow:visible;opacity:0.25;" width="98" height="103" xlink:href="data:image/png;base64,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" transform="matrix(2.0005 0 0 2.0005 266.0605 40.0091)">\n' +
        '\t\t\t\t<animate attributeType="CSS" attributeName="opacity" begin="0.5" dur="1" from="1" to="0" repeatCount="indefinite" />\n' +
        '\t\t\t</image>\n' +
        '\t\t</g>\n' +
        '\t</g>\n' +
        '\t<g >\n' +
        '\t\t<defs>\n' +
        '\t\t\t<path id="SVGID_9_" d="M286.1,0v30.7c0,0,180.7-7.3,195.3,196h30.7C512.1,226.7,510.7,14.6,286.1,0z"/>\n' +
        '\t\t</defs>\n' +
        '\t\t<g>\n' +
        '\t\t\t<image style="overflow:visible;opacity:0;" width="134" height="123" xlink:href="data:image/png;base64,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 SUVORK5CYII=" transform="matrix(2.0005 0 0 2.0005 244.0555 0)">\n' +
        '\t\t\t\t<animate attributeType="CSS" attributeName="opacity" begin="0.75" dur="1" from="1" to="0" repeatCount="indefinite" />\n' +
        '\t\t\t</image>\n' +
        '\t\t</g>\n' +
        '\t</g>\n' +
        '</svg>\n',

      warn: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="24" fill="#F5CE69"/><path d="M24 16.5C24.8285 16.5 25.5 17.1716 25.5 18V24C25.5 24.8284 24.8285 25.5 24 25.5C23.1715 25.5 22.5 24.8284 22.5 24V18C22.5 17.1716 23.1715 16.5 24 16.5Z" fill="#DCA14E"/><path d="M25.5 28.5C25.5 27.6716 24.8285 27 24 27C23.1715 27 22.5 27.6716 22.5 28.5V30C22.5 30.8284 23.1715 31.5 24 31.5C24.8285 31.5 25.5 30.8284 25.5 30V28.5Z" fill="#DCA14E"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 24C7.5 14.8873 14.8873 7.5 24 7.5C33.1127 7.5 40.5 14.8873 40.5 24C40.5 33.1127 33.1127 40.5 24 40.5C14.8873 40.5 7.5 33.1127 7.5 24ZM24 10.5C16.5441 10.5 10.5 16.5442 10.5 24C10.5 31.4558 16.5441 37.5 24 37.5C31.4559 37.5 37.5 31.4558 37.5 24C37.5 16.5442 31.4559 10.5 24 10.5Z" fill="#DCA14E"/></svg>',

      error: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="24" fill="#ED8476"/><path d="M34.0607 16.0607C34.6465 15.4749 34.6465 14.5251 34.0607 13.9393C33.4749 13.3536 32.5251 13.3536 31.9394 13.9393L24 21.8787L16.0607 13.9393C15.4749 13.3536 14.5251 13.3536 13.9394 13.9393C13.3535 14.5251 13.3535 15.4749 13.9394 16.0607L21.8787 24L13.9394 31.9393C13.3535 32.5251 13.3535 33.4749 13.9394 34.0607C14.5251 34.6464 15.4749 34.6464 16.0607 34.0607L24 26.1213L31.9394 34.0607C32.5251 34.6464 33.4749 34.6464 34.0607 34.0607C34.6465 33.4749 34.6465 32.5251 34.0607 31.9393L26.1213 24L34.0607 16.0607Z" fill="#C54F4F"/></svg>',

      close: '<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.70711 1.7071C10.0976 1.31659 10.0976 0.683407 9.70711 0.292889C9.31659 -0.0976295 8.68341 -0.0976295 8.29289 0.292889L5 3.58578L1.70711 0.292889C1.31659 -0.0976295 0.68342 -0.0976295 0.292894 0.292889C-0.0976315 0.683407 -0.0976315 1.31659 0.292894 1.7071L3.58579 5L0.292894 8.29289C-0.0976315 8.68341 -0.0976315 9.31659 0.292894 9.7071C0.68342 10.0976 1.31659 10.0976 1.70711 9.7071L5 6.41421L8.29289 9.7071C8.68341 10.0976 9.31659 10.0976 9.70711 9.7071C10.0976 9.31659 10.0976 8.68341 9.70711 8.29289L6.41422 5L9.70711 1.7071Z" fill="black" fill-opacity="0.37"/></svg>',

      newNotification: '<svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d)"><circle cx="20.5" cy="16.5" r="16.5" fill="#C08AE1"/></g><path d="M13 21L21 13L29 21" stroke="black" stroke-opacity="0.6" stroke-width="3"/><defs><filter id="filter0_d" x="0" y="0" width="41" height="41" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="4"/><feGaussianBlur stdDeviation="2"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>'
    }
  }
})