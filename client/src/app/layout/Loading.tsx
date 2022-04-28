import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

const hamster = keyframes`
	from, to { transform: rotate(4deg) translate(-0.8em,1.85em); }
	50% { transform: rotate(0) translate(-0.8em,1.85em); }
`

const hamsterHead = keyframes`
  from, 25%, 50%, 75%, to { transform: rotate(0); }
	12.5%, 37.5%, 62.5%, 87.5% { transform: rotate(8deg); }
`

const spoke = keyframes`
  from { transform: rotate(0); }
	to { transform: rotate(-1turn); }
`

const eye = keyframes`
  from, 90%, to { transform: scaleY(1); }
	95% { transform: scaleY(0); }
`

const ear = keyframes`
  from, 25%, 50%, 75%, to { transform: rotate(0); }
	12.5%, 37.5%, 62.5%, 87.5% { transform: rotate(12deg); }
`

const frontRightLeg = keyframes`
  from, 25%, 50%, 75%, to { transform: rotate(50deg) translateZ(-1px); }
	12.5%, 37.5%, 62.5%, 87.5% { transform: rotate(-30deg) translateZ(-1px); }
`

const frontLeftLeg = keyframes`
  from, 25%, 50%, 75%, to { transform: rotate(-30deg); }
	12.5%, 37.5%, 62.5%, 87.5% { transform: rotate(50deg); }
`

const backRightLeg = keyframes`
  from, 25%, 50%, 75%, to { transform: rotate(-60deg) translateZ(-1px); }
	12.5%, 37.5%, 62.5%, 87.5% { transform: rotate(20deg) translateZ(-1px); }
`
const backLeftLeg = keyframes`
  from, 25%, 50%, 75%, to { transform: rotate(20deg); }
	12.5%, 37.5%, 62.5%, 87.5% { transform: rotate(-60deg); }
`

const tail = keyframes`
  from, 25%, 50%, 75%, to { transform: rotate(30deg) translateZ(-1px); }
	12.5%, 37.5%, 62.5%, 87.5% { transform: rotate(10deg) translateZ(-1px); }
`

const WheelAndHamster = styled.div({
  '--dur': '1s',
  position: 'relative',
  width: '12em',
  height: '12em'
})

const Wheel = styled.div({
  position: 'absolute',
  borderRadius: '50%',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background:
    'radial-gradient(100% 100% at center,hsla(0,0%,60%,0) 47.8%,hsl(0,0%,60%) 48%)',
  zIndex: 2
})

const Spoke = styled.div({
  position: 'absolute',
  borderRadius: '50%',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  animation: `${spoke} var(--dur) linear infinite`,
  background:
    'radial-gradient(100% 100% at center,hsl(0,0%,60%) 4.8%,hsla(0,0%,60%,0) 5%),linear-gradient(hsla(0,0%,55%,0) 46.9%,hsl(0,0%,65%) 47% 52.9%,hsla(0,0%,65%,0) 53%) 50% 50% / 99% 99% no-repeat'
})

const Hamster = styled.div({
  div: { position: 'absolute' },
  position: 'absolute',
  top: '50%',
  left: 'calc(50% - 3.5em)',
  width: '7em',
  height: '3.75em',
  transform: 'rotate(4deg) translate(-0.8em, 1.85em)',
  transformOrigin: '50% 0',
  zIndex: 1
})
const HamsterBody = styled.div({
  animation: `${hamster} var(--dur) ease-in-out infinite`,
  background: 'hsl(30,90%,90%)',
  borderRadius: '50% 30% 50% 30% / 15% 60% 40% 40%',
  boxShadow: `
    0.1em 0.75em 0 hsl(30,90%,55%) inset,
    0.15em -0.5em 0 hsl(30,90%,80%) inset`,
  top: '-1.75em',
  left: '3em',
  width: '4.5em',
  height: '3em',
  transformOrigin: '17% 50%',
  transformStyle: 'preserve-3d'
})
const HamsterHead = styled.div({
  animation: `${hamsterHead} var(--dur) ease-in-out infinite`,
  background: 'hsl(30,90%,55%)',
  borderRadius: '70% 30% 0 100% / 40% 25% 25% 60%',
  boxShadow:
    '0 -0.25em 0 hsl(30,90%,80%) inset, 0.75em -1.55em 0 hsl(30, 90%, 90%) inset',
  top: 0,
  left: '-2em',
  width: '2.75em',
  height: '2.5em',
  transformOrigin: '100% 50%'
})
const HamsterEar = styled.div({
  animation: `${ear} var(--dur) ease-in-out infinite`,
  background: 'hsl(0, 90%, 85%)',
  borderRadius: '50%',
  boxShadow: '-0.25em 0 hsl(30, 90%, 55%) inset',
  top: '-0.25em',
  right: '-0.25em',
  width: '0.75em',
  height: '0.75em',
  transformOrigin: '50% 75%'
})
const HamsterEye = styled.div({
  animation: `${eye} var(--dur) linear infinite`,
  backgroundColor: 'hsl(0, 0%, 0%)',
  borderRadius: '50%',
  top: '0.375em',
  left: '1.25em',
  width: '0.5em',
  height: '0.5em'
})
const HamsterNose = styled.div({
  background: 'hsl(0, 90%, 75%)',
  borderRadius: '35% 65% 85% 15% / 70% 50% 50% 30%',
  top: ' 0.75em',
  left: 0,
  width: '0.2em',
  height: '0.25em'
})

const HamsterTail = styled.div({
  animation: `${tail} var(--dur) linear infinite`,
  background: 'hsl(30, 90%, 55%)',
  borderRadius: '0.25em 50% 50% 0.25em',
  boxShadow: '0 -0.2em 0 hsl(30, 90%, 90%) inset',
  top: '1.5em',
  right: '-0.5em',
  width: '1em',
  height: '0.5em',
  transform: 'rotate(30deg) translateZ(-1px)',
  transformOrigin: '0.25em 0.25em'
})

const LegFrontRight = styled.div({
  animation: `${frontRightLeg} var(--dur) linear infinite`,
  clipPath:
    'polygon(0 0, 100% 0, 70% 80%, 60% 100%, 0% 100%, 40% 80%)',
  top: '2em',
  left: '0.5em',
  width: '1em',
  height: '1.5em',
  transformOrigin: '50% 0',
  background:
    'linear-gradient(hsl(30, 90%, 80%) 80%, hsl(0, 90%, 75%) 80%)',
  transform: 'rotate(15deg) translateZ(-1px)'
})
const LegFrontLeft = styled.div({
  animation: `${frontLeftLeg} var(--dur) linear infinite`,
  clipPath:
    'polygon(0 0, 100% 0, 70% 80%, 60% 100%, 0% 100%, 40% 80%)',
  top: '2em',
  left: '0.5em',
  width: '1em',
  height: '1.5em',
  transformOrigin: '50% 0',
  background:
    'linear-gradient(hsl(30, 90%, 90%) 80%, hsl(0, 90%, 85%) 80%)',
  transform: 'rotate(15deg)'
})

const LegBackRight = styled.div({
  animation: `${backRightLeg} var(--dur) linear infinite`,
  borderRadius: '0.75em 0.75em 0 0',
  clipPath:
    'polygon(0 0, 100% 0, 100% 30%, 70% 90%, 70% 100%, 30% 100%, 40% 90%, 0% 30%)',
  top: '1em',
  left: '2.8em',
  width: '1.5em',
  height: ' 2.5em',
  transformOrigin: ' 50% 30%',
  background:
    'linear-gradient(hsl(30, 90%, 80%) 90%, hsl(0, 90%, 75%) 90%)',
  transform: 'rotate(-25deg) translateZ(-1px)'
})

const LegBackLeft = styled.div({
  animation: `${backLeftLeg} var(--dur) linear infinite`,
  borderRadius: '0.75em 0.75em 0 0',
  clipPath:
    'polygon(0 0, 100% 0, 100% 30%, 70% 90%, 70% 100%, 30% 100%, 40% 90%, 0% 30%)',
  top: '1em',
  left: '2.8em',
  width: '1.5em',
  height: ' 2.5em',
  transformOrigin: ' 50% 30%',
  background:
    'linear-gradient(hsl(30, 90%, 90%) 90%, hsl(0, 90%, 85%) 90%)',
  transform: 'rotate(-25deg)'
})

export function Loading(): JSX.Element {
  return (
    <WheelAndHamster
      role="img"
      aria-label="Orange and tan hamster running in a metal wheel"
    >
      <Wheel />
      <Hamster>
        <HamsterBody>
          <HamsterHead>
            <HamsterEar />
            <HamsterEye />
            <HamsterNose />
          </HamsterHead>
          <LegFrontRight />
          <LegFrontLeft />
          <LegBackRight />
          <LegBackLeft />
          <HamsterTail />
        </HamsterBody>
      </Hamster>
      <Spoke />
    </WheelAndHamster>
  )
}
