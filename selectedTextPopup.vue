<template>
  <div>
    <GlobalEvents @mouseup="handleMouseup"></GlobalEvents>
    <transition name="slide">
      <div v-if="selected" class="popup-container" :style="popupStyle">
        <div class="popup">
          <a
            v-if="github"
            tooltip
            tooltip-content="Problem with the docs? Create a GitHub Issue!"
            :href="
              `https://github.com/${githubOwner}/${githubRepo}/issues/new?title=${githubIssueTitle}&body=${encodeURI(
                selectedText
              )}&labels=${githubLabels.toString()}`
            "
            target="_blank"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 16 16"
              version="1.1"
              aria-hidden="true"
            >
              <path
                fill="white"
                fill-rule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
              ></path>
            </svg>
          </a>

          <a
            v-if="twitter"
            tooltip
            tooltip-content="Tweet about this!"
            :href="`http://twitter.com/intent/tweet?text=${selectedText}`"
            target="_blank"
          >
            <svg width="28" height="28" viewBox="0 0 24 24">
              <path
                fill="white"
                d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
              />
            </svg>
          </a>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
/* global GITHUB, GITHUB_OWNER, GITHUB_REPO, GITHUB_ISSUE_TITLE, GITHUB_LABELS, TWITTER */
import GlobalEvents from 'vue-global-events'

export default {
  components: {
    GlobalEvents
  },
  data() {
    return {
      position: { top: null, left: null },
      selected: false,
      selectedText: null,
      github: GITHUB,
      githubOwner: GITHUB_OWNER,
      githubRepo: GITHUB_REPO,
      githubIssueTitle: GITHUB_ISSUE_TITLE,
      githubLabels: GITHUB_LABELS,
      twitter: TWITTER
    }
  },
  computed: {
    popupStyle() {
      return {
        left: `${this.position.left}px`,
        top: `${this.position.top}px`
      }
    }
  },
  methods: {
    // Kudos to https://stackoverflow.com/a/5517449 for this (just updated it for Vue)
    getSelection() {
      if (window.getSelection) {
        return window.getSelection()
      } else if (document.getSelection) {
        return document.getSelection()
      } else {
        return document.selection ? document.selection.createRange() : false
      }
      return false
    },
    handleMouseup() {
      setTimeout(() => {
        let selection = this.getSelection()

        if (
          selection &&
          selection.type.includes('Range') &&
          selection.rangeCount !== 0
        ) {
          this.selected = true
          let bbox = selection.getRangeAt(0).getBoundingClientRect()

          this.selectedText = selection.toString()

          let top = bbox.top + window.scrollY - 50,
            left = bbox.left + window.scrollX + bbox.width / 2 - 32
          this.position = {
            top: top,
            left: left
          }
        } else {
          this.selected = false
        }
      }, 10)
    }
  }
}
</script>

<style>
.popup-container {
  height: 46px;
  position: absolute;
}

.popup {
  background-color: rgba(29, 37, 43, 0.85);
  border-radius: 4px;
  box-shadow: 0px 3px 3px 0 rgba(0, 0, 0, 0.4);
  color: #fff;
  height: 28px;
  padding: 4px;
  position: relative;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.popup a {
  height: 28px;
  margin: 0 5px;
  position: relative;
}

.popup a svg path {
  transition: fill 0.25s;
}

.popup a:hover svg path {
  fill: #3b8dff;
}

.popup-container::after {
  border: 8px solid rgba(29, 37, 43, 0.85);
  border-color: transparent transparent rgba(29, 37, 43, 0.85)
    rgba(29, 37, 43, 0.85);
  bottom: -6px;
  box-sizing: border-box;
  box-shadow: -3px 3px 3px 0 rgba(0, 0, 0, 0.4);
  content: '';
  height: 0;
  left: 50%;
  margin-left: -3px;
  opacity: 1;
  position: absolute;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform: translate(-50%) rotate(-45deg);
  transform-origin: 0 0;
  width: 0;
}

[tooltip]::before {
  background: rgba(0, 0, 0, 0.7);
  border-radius: 3px;
  bottom: 200%;
  color: white !important;
  content: attr(tooltip-content);
  display: block;
  font-size: 10px;
  left: 50%;
  opacity: 0;
  padding: 4px 8px;
  pointer-events: none;
  position: absolute;
  text-align: center;
  text-transform: none;
  transition: all 0.1s;
  transform: translate(-50%, 25%);
  width: 250%;
  z-index: 1;
}

[tooltip]:hover::before {
  opacity: 1;
  transform: translate(-50%);
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.1s;
}

.slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translate(0, 25%);
}
</style>
