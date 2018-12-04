let emotionsOrder = [
  'anger',
  'fear',
  'joy',
  'sadness',
  'analytical',
  'confident',
  'tentative',
  'negative',
  'positive'
]

let output = [0,0,0,0,0,0,0,0,0]

export function emotionArray(data) {
  console.log(data.detectedEmotions)
  let emotions = data.detectedEmotions
  for (let i = 0; i < emotions.length; i++) {
    console.log(emotions[i].tone_id)
    let index = emotionsOrder.indexOf(emotions[i].tone_id)
    console.log(index)
    output[index] = emotions[i].score
  }
  return output
}