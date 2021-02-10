import React, {useEffect, useState} from 'react'
import { ExtensionPoint } from 'vtex.render-runtime'
import { useCookies } from 'react-cookie'
import styles from './AgeGate.css'

const AgeGate = () => {
	const [cookies, setCookie] = useCookies(['ageGate'])
	const [day, setDay] = useState(`0`)
	const [mounth, setMounth] = useState(`0`)
	const [year, setYear] = useState(`0`)
	const [isRemember, setRemember] = useState(false)
	const [isAccess, setAccess] = useState(true)
	const handleClick = () => {
		if(isRemember) {
			let expiresDate = new Date()
			expiresDate.setDate(expiresDate.getDate() + 60)
			setCookie('ageGate', true, {expires: expiresDate})
		} else {
			setCookie('ageGate', true)
		}
	}
	const onClickConfirm = () => {
		const msIn18Years = 568025136000
		const nowDate = Date.now()
 		const inputDateInMs = Date.parse(`${year}-${mounth}-${day}`)
		const isLegal = nowDate - inputDateInMs >= msIn18Years ? true : false
		if(!isLegal) {
			setAccess(false)
		} else if(isLegal){
			handleClick()
		}
	}
	useEffect(() => {
		if (!cookies.ageGate) {
			setCookie('ageGate', false)
		}
	}, [])

	return (
		<div>
			{cookies.ageGate == 'false' && (
				<div className={styles.ageGateWrapper}>
					<div className={styles.ageGateContainer}>
						<div className={`${styles.ageGateLogoContainer} flex`}>
								<img src="https://abiukb2b.vtexassets.com/assets/vtex.file-manager-graphql/images/bbf1e82e-4f97-4522-87ab-04d2db76e4f9___6fac24d876adbe6ff74517a19cb28883.png"></img>
						</div>
						{isAccess ? <div className={styles.ageGateUnderAge}>
						<ExtensionPoint id="rich-text" />
						<p>Are you over Legal Drinking Age?</p>

						<div className={styles.inputContainer}>
							<input className={styles.dataInput} onChange={e => setDay(e.target.value)} autoFocus min={1} max={31} type="number" name="agegate-d" maxLength={2} placeholder="dd" tabIndex={0}></input>
							<input className={styles.dataInput} onChange={e => setMounth(e.target.value)} min={1} max={12} type="number" name="agegate-m" maxLength={2} placeholder="mm" tabIndex={0}></input>
							<input className={styles.dataInput} onChange={e => setYear(e.target.value)} min={0} type="number" name="agegate-y" maxLength={4} placeholder="yyyy" tabIndex={0}></input>
						</div>
							<label>Remember me*
								<input id="remember" type="checkbox" onChange={()=> setRemember(!isRemember)}></input>
							</label>
							 <button className={styles.ageGateButton} onClick={onClickConfirm}>
								CONTINUE
						</button>
						</div> : <div><p>Sorry, you must be 18 years or older to visit this website</p></div>}
						<div className={styles.textContainer}>
							<p className={styles.descriptionBottomText}>© 2021 AB InBev UK Limited T/A Budweiser Brewing Group UK&I</p>
							<p className={styles.descriptionBottomText}>For the facts <a href='https://www.drinkaware.co.uk/'>drinkaware.co.uk</a></p>
							<p className={styles.descriptionBottomText}>Please do not share content of this site with anyone underage</p>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

AgeGate.schema = {
	title: 'AgeGate',
	description: 'Age Gate',
	type: 'object',
}

export default AgeGate
