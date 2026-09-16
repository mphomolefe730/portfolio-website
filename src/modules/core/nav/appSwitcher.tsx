import bcrypt from 'bcryptjs';
import { useState } from 'react';
import { env } from "../../../configs/environment";

function AppSwitcher({ isUserLoggedIn }: { isUserLoggedIn: boolean }){    
	const [hashedPassword, setHashedPassword] = useState("");
	const [generatedHashedPassword, setGeneratedHashedPassword] = useState("");

	let showApps = () => {
		let appSwitchSubMenu = document.querySelector('.appSwitchSubMenu') as HTMLElement;
		if (appSwitchSubMenu) {
			appSwitchSubMenu.style.display = appSwitchSubMenu.style.display === 'none' ? 'block' : 'none';
		}
	};
	
	const hashingOfPassword = async (userPassword: string) => {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(userPassword, salt);
	};

    return(
        <>        
			<div className='appSwitchLogo' onClick={()=> showApps()}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <rect x="2" y="3" width="3.5" height="3.5" rx="0.8" />
                    <rect x="7.5" y="3" width="3.5" height="3.5" rx="0.8" />
                    <rect x="13" y="3" width="3.5" height="3.5" rx="0.8" />
                    <rect x="18.5" y="3" width="3.5" height="3.5" rx="0.8" />
                    <rect x="2" y="10.25" width="3.5" height="3.5" rx="0.8" />
                    <rect x="7.5" y="10.25" width="3.5" height="3.5" rx="0.8" />
                    <rect x="13" y="10.25" width="3.5" height="3.5" rx="0.8" />
                    <rect x="18.5" y="10.25" width="3.5" height="3.5" rx="0.8" />
                    <rect x="2" y="17.5" width="3.5" height="3.5" rx="0.8" />
                    <rect x="7.5" y="17.5" width="3.5" height="3.5" rx="0.8" />
                    <rect x="13" y="17.5" width="3.5" height="3.5" rx="0.8" />
                    <rect x="18.5" y="17.5" width="3.5" height="3.5" rx="0.8" />
                </svg>
            </div>
            <div className='appSwitchSubMenu informationPill'>	
                <div>
                    <p >APPS</p>
                    <div className='appContainer'>
                        <a className='navTitle' href='/'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
                                <defs>
                                    <linearGradient id="homeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stop-color="#34d399" />
                                        <stop offset="100%" stop-color="#059669" />
                                    </linearGradient>
                                    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                                    <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.15" />
                                    </filter>
                                </defs>
                                <rect x="32" y="32" width="448" height="448" rx="100" fill="url(#homeGrad)" filter="url(#shadow)" />
                                <path d="M256 120 L128 224 V376 C128 384.837 135.163 392 144 392 H208 V288 C208 279.163 215.163 272 224 272 H288 C296.837 272 304 279.163 304 288 V392 H368 C376.837 392 384 384.837 384 376 V224 Z" fill="#ffffff" />
                            </svg>
                            <p>Home</p>
                        </a>
                        <a className='navTitle' href='/admin'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
                                <defs>
                                    <linearGradient id="adminGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stop-color="#3b82f6" />
                                    <stop offset="100%" stop-color="#1d4ed8" />
                                    </linearGradient>
                                    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                                    <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.15" />
                                    </filter>
                                </defs>
                                <rect x="32" y="32" width="448" height="448" rx="100" fill="url(#adminGrad)" filter="url(#shadow)" />
                                <g fill="#ffffff">
                                    <path d="M256 120 C320 120 368 136 368 136 V248 C368 328 296 384 256 400 C216 384 144 328 144 248 V136 C144 136 192 120 256 120 Z" opacity="0.25" />
                                    <path d="M256 200 A56 56 0 1 0 256 312 A56 56 0 1 0 256 200 Z M256 168 C262.627 168 268 173.373 268 180 V188.7 C277.6 191.2 286.5 195.5 294.3 201.2 L301.7 195 C306.4 191.1 313.3 191.7 317.2 196.4 L327.6 208.9 C331.5 213.6 330.9 220.5 326.2 224.4 L320 229.7 C325.7 237.5 330 246.4 332.5 256 H341.2 C347.8 256 353.2 261.4 353.2 268 V284 C353.2 290.6 347.8 296 341.2 296 H332.5 C330 305.6 325.7 314.5 320 322.3 L326.2 327.6 C330.9 331.5 331.5 338.4 327.6 343.1 L317.2 355.6 C313.3 360.3 306.4 360.9 301.7 357 L294.3 350.8 C286.5 356.5 277.6 360.8 268 363.3 V372 C268 378.6 262.627 384 256 384 C249.373 384 244 378.6 244 372 V363.3 C234.4 360.8 225.5 356.5 217.7 350.8 L210.3 357 C205.6 360.9 198.7 360.3 194.8 355.6 L184.4 343.1 C180.5 338.4 181.1 331.5 185.8 327.6 L192 322.3 C186.3 314.5 182 305.6 179.5 296 H170.8 C164.2 296 158.8 290.6 158.8 284 V268 C158.8 261.4 164.2 256 170.8 256 H179.5 C182 246.4 186.3 237.5 192 229.7 L185.8 224.4 C181.1 220.5 180.5 213.6 184.4 208.9 L194.8 196.4 C198.7 191.7 205.6 191.1 210.3 195 L217.7 201.2 C225.5 195.5 234.4 191.2 244 188.7 V180 C244 173.373 249.373 168 256 168 Z" />
                                </g>
                            </svg>
                            <p>ADMIN</p>
                        </a>
                        <a className='navTitle' href='/onboarding'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
                                <defs>
                                    <linearGradient id="onboardingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stop-color="#8b5cf6" />
                                        <stop offset="100%" stop-color="#ec4899" />
                                    </linearGradient>
                                    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                                        <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.18" />
                                    </filter>
                                </defs>
                                <rect x="32" y="32" width="448" height="448" rx="100" fill="url(#onboardingGrad)" filter="url(#shadow)" />

                                <g fill="#ffffff">
                                    <path d="M 256 120 A 136 136 0 1 0 392 256 A 136 136 0 0 0 256 120 Z M 256 360 A 104 104 0 1 1 360 256 A 104 104 0 0 1 256 360 Z" opacity="0.3" />
                                    <path d="M 334.2 177.8 C 304.5 177.8 261 210.3 241 235 L 210 235 L 180 205 L 152 205 L 170 247 L 140 277 L 115 270 L 98 287 L 132 321 L 122 331 C 117 336 117 344 122 349 L 163 390 C 168 395 176 395 181 390 L 191 380 L 225 414 L 242 397 L 235 372 L 265 342 L 307 360 L 307 332 L 277 302 L 277 271 C 301.7 251 334.2 207.5 334.2 177.8 Z M 292 220 C 283.7 220 277 213.3 277 205 C 277 196.7 283.7 190 292 190 C 300.3 190 307 196.7 307 205 C 307 213.3 300.3 220 292 220 Z" />
                                    <path d="M 140 140 L 146 158 L 164 164 L 146 170 L 140 188 L 134 170 L 116 164 L 134 158 Z" opacity="0.8" />
                                    <path d="M 360 340 L 364 352 L 376 356 L 364 360 L 360 372 L 356 360 L 344 356 L 356 352 Z" opacity="0.8" />
                                </g>
                            </svg>
                            <p>JOIN</p>
                        </a>
                    </div>              
                    <p >UTILITIES</p>
                    <div className='appContainer'>
                        <a className='navTitle' href='/icons'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
                                <defs>
                                    <linearGradient id="iconsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stop-color="#6366f1" />
                                        <stop offset="50%" stop-color="#a855f7" />
                                        <stop offset="100%" stop-color="#ec4899" />
                                    </linearGradient>                                
                                    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                                        <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.18" />
                                    </filter>
                                </defs>
                                <rect x="32" y="32" width="448" height="448" rx="100" fill="url(#iconsGrad)" filter="url(#shadow)" />
                                <g fill="#ffffff">
                                    <path d="M 180 140 L 192 176 L 230 176 L 199 198 L 211 234 L 180 211 L 149 234 L 161 198 L 130 176 L 168 176 Z" />
                                    <path d="M 332 140 A 48 48 0 1 0 332 236 A 48 48 0 1 0 332 140 Z M 332 168 A 20 20 0 1 1 332 208 A 20 20 0 1 1 332 168 Z" />
                                    <rect x="136" y="284" width="88" height="88" rx="20" />
                                    <path d="M 332 276 L 376 328 L 332 380 L 288 328 Z" />
                                    <path d="M 256 120 V 392 M 120 256 H 392" stroke="#ffffff" stroke-width="8" stroke-dasharray="12 12" stroke-linecap="round" opacity="0.35" />
                                </g>
                            </svg>
                            <p>Icons</p>
                        </a>
                    </div>
                    <div style={{display: isUserLoggedIn ? "block" : "none", backgroundColor: "var(--theme-text)", padding: "10px"}} >	
                        <h5 className='company_name'>Password Hasher</h5>						
                        <input
                            className='inputTag'
                            type="text"
                            placeholder="Enter password to hash"
                            value={hashedPassword}
                            onChange={(e) => setHashedPassword(e.target.value)}
                        />
                        <p className='adminLoginUtilityNote'>
                            Note: password hashing adds a layer of security to protect user credentials. This function generates a hashed version of the password, which can be stored securely in the database instead of the plain text password. Only for Mpho's use, do not share the hashed password with anyone else.
                        </p>
                        {generatedHashedPassword && (
                            <a
                            href={`https://wa.me/${env.PHONE_NUMBER}?text=${encodeURIComponent(
                                `Generated Hashed Password: ${generatedHashedPassword}`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={async () => {
                                await navigator.clipboard.writeText(generatedHashedPassword);
                                alert("Copied to clipboard! Opening WhatsApp...");
                            }}
                            >
                            <h5>Generated Hashed Password:</h5>
                            <p>{generatedHashedPassword}</p>
                            </a>
                        )}
                        <button
                            className='contactButton'
                            type="button"
                            onClick={async () => {
                            const hash = await hashingOfPassword(hashedPassword);
                            setGeneratedHashedPassword(hash);
                            }}
                        >
                            HASH PASSWORD
                        </button>						
                    </div>	
                </div>
            </div>
        </>
    )
}

export default AppSwitcher;