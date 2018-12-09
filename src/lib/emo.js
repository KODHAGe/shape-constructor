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


export async function emotionArray(data) {
  data = await data
  let output = [0,0,0,0,0,0,0,0,0]

  let emotions = data.detectedEmotions
  for (let i = 0; i < emotions.length; i++) {
    let index = emotionsOrder.indexOf(emotions[i].tone_id)
    output[index] = emotions[i].score
  }
  if(data.sentiment && data.sentiment > 0) {
    output[8] = data.sentiment
  } else {
    output[7] = Math.abs(data.sentiment)
  }
  return output
}