<template>
  <div>
    <code> Quiz Addon View </code>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'

/**
 *
 * **ADDON**
 * ---
 *
 * View for **QuizAddonView**
 *
 * @summary QuizAddonView addon allows users to create (build) different types of quizes
 *          pass them to students and check answers.
 *
 *          Initial output is to export JSON from created quiz, so if necessary to
 *          share as a poll/quiz for example in telegram, discord socials.
 *
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
@Component({
  name: 'QuizAddonView'
})
export class QuizAddonView extends Vue {

}
export default QuizAddonView
</script>