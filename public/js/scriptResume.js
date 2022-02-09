// save api
document.getElementById('save').addEventListener('click', async (e) => {
  e.preventDefault();
  var token = new URLSearchParams(window.location.search).get('token');
  const name = document.getElementById('name').innerText;
  const role = document.getElementById('role').innerText;
  const info = document.getElementById('info').innerText;
  const address = document.getElementById('address').innerText;
  const phone = document.getElementById('phone').innerText;
  const email = document.getElementById('email').innerText;
  const skills = document.getElementById('skills').innerText;
  const year1 = document.getElementById('year1').innerText;
  const title1 = document.getElementById('title1').innerText;
  const desc1 = document.getElementById('desc1').innerText;
  const year2 = document.getElementById('year2').innerText;
  const title2 = document.getElementById('title2').innerText;
  const desc2 = document.getElementById('desc2').innerText;
  const year3 = document.getElementById('year3').innerText;
  const title3 = document.getElementById('title3').innerText;
  const desc3 = document.getElementById('desc3').innerText;
  const year1ex = document.getElementById('year1ex').innerText;
  const title1ex = document.getElementById('title1ex').innerText;
  const desc1ex = document.getElementById('desc1ex').innerText;
  const year2ex = document.getElementById('year2ex').innerText;
  const title2ex = document.getElementById('title2ex').innerText;
  const desc2ex = document.getElementById('desc2ex').innerText;
  const year3ex = document.getElementById('year3ex').innerText;
  const title3ex = document.getElementById('title3ex').innerText;
  const desc3ex = document.getElementById('desc3ex').innerText;
  const year4ex = document.getElementById('year4ex').innerText;
  const title4ex = document.getElementById('title4ex').innerText;
  const desc4ex = document.getElementById('desc4ex').innerText;
  const year5ex = document.getElementById('year5ex').innerText;
  const title5ex = document.getElementById('title5ex').innerText;
  const desc5ex = document.getElementById('desc5ex').innerText;
  //const img = document.getElementById('img').value;

  const res = await fetch('/api/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: token,
      name: name,
      role: role,
      info: info,
      address: address,
      phone: phone,
      email: email,
      skills: skills,
      year1: year1,
      title1: title1,
      desc1: desc1,
      year2: year2,
      title2: title2,
      desc2: desc2,
      year3: year3,
      title3: title3,
      desc3: desc3,
      year1ex: year1ex,
      title1ex: title1ex,
      desc1ex: desc1ex,
      year2ex: year2ex,
      title2ex: title2ex,
      desc2ex: desc2ex,
      year3ex: year3ex,
      title3ex: title3ex,
      desc3ex: desc3ex,
      year4ex: year4ex,
      title4ex: title4ex,
      desc4ex: desc4ex,
      year5ex: year5ex,
      title5ex: title5ex,
      desc5ex: desc5ex,
      //img: img
    })
  }).then((res) => res.json());

  if(res.status === 'ok'){
    alert('Saved!');
  }

  if(res.status === 'error'){
    alert(res.error);
  }
})


document.getElementById('generatepdf').addEventListener('click', async () => {
  var element = document.getElementById('resume_wrapper');
  element.style.marginTop = '-50px';
  document.getElementById('uploaddp').style.visibility = 'hidden';
  var opt = {
    filename:     'myfile.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  
  // New Promise-based usage:
  await html2pdf().set(opt).from(element).save();
  element.style.marginTop = '50px';
  document.getElementById('uploaddp').style.visibility = 'visible';;
})
