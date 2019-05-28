function rleEncode(level) {
  const out = []
  let prev = null
  let amount = 0
  for (const val of level) {
    if (val === prev) {
      amount++
    } else {
      if (prev != null) {
        out.push(prev)
        out.push(amount)
      }
      prev = val
      amount = 1
    }
  }
  out.push(prev)
  out.push(amount)
  return out
}

function rleDecode(levelData) {
  const pairs = levelData.reduce((result, value, index, array) => {
    if (index % 2 === 0) {
      result.push(array.slice(index, index + 2))
    }
    return result
  }, [])
  const level = []
  for (const val of pairs) {
    for (let i = 0; i < val[1]; i++) {
      level.push(val[0])
    }
  }
  return level
}

function saveLevelString(rooms) {
  const rleRooms = {}
  for (const key in rooms) {
    rleRooms[key] = rleEncode(rooms[key])
  }
  const dataEl = document.querySelector(".levelData")
  dataEl.innerText = JSON.stringify(rleRooms)
  console.log(level.length)
}

let level = null

export const editor = {
  setLevel: function setLevel(newLevel) {
    level = newLevel
  },
  startEditor: function startEditor (canvas, scale, rooms, levelWidth, tileSize) {

    function getMouseXYFromEvent(e) {
      const x = event.offsetX * canvas.width / canvas.offsetWidth / scale
      const y = event.offsetY * canvas.height / canvas.offsetHeight / scale
      return {x, y}
    }

    function mouseMove(e) {
      const pos = getMouseXYFromEvent(e)
      const tile = {x: Math.floor(pos.x / 8), y: Math.floor(pos.y / 8)}
      const i = tile.x + tile.y * levelWidth
      if (e.buttons === 1) {
        level[i] = 1
        saveLevelString(rooms)
      }
      if (e.buttons === 2) {
        level[i] = 0
        saveLevelString(rooms)
      }
    }

    canvas.addEventListener("mousemove", mouseMove)
    canvas.addEventListener("mousedown", mouseMove)
    canvas.addEventListener("contextmenu", function (e) {
      e.preventDefault()
    })
  },
  rleDecode,
  rleEncode,
}

