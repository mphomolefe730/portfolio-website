import './share.css';

function Share() {
  const shareOptions = [
    { name: "LinkedIn", link: "http://linkedin.com/in/mpho-molefe-a67ab9284/" },
    { name: "TikTok", link: "https://tiktok.com/@mphomolefe730" },
    { name: "X", link: "https://x.com/mphomolefeww" },
    { name: "Email", link: "mailto:mphomolefe730@gmail.com" }
  ];

  let qrcode: { alt:string, text: string, linkToPhoto: string } = {
		alt: 'QR code to view website on phone',
		text: 'scan/view on phone',
		linkToPhoto: 'https://raw.githubusercontent.com/mphomolefe730/portfolio-website/refs/heads/main/src/assets/website_images/website_qr_code.png'
	};

  return (
    <div className="share-container">
        <h3>Share Portal</h3>    

        <div className='qrcode-container'>
            <img src={qrcode.linkToPhoto} alt={qrcode.alt} />
            <h6> {qrcode.text.toUpperCase()} </h6>
        </div>
        <div className="share-options">
            {shareOptions.map((option, index) => (
            <a
                key={index}
                href={option.link}
                target="_blank"
                rel="noopener noreferrer"
                className="informationPill"
            >
                {option.name}
            </a>
            ))}
        </div>
    </div>
  );
}

export default Share;