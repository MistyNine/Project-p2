const form = document.getElementById('feedbackForm');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // ป้องกันการรีเฟรชหน้า

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({}) // ส่งข้อมูลว่างเปล่า
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        alert('ส่งข้อมูลสำเร็จ!');
        form.reset(); // ล้างข้อมูลในฟอร์ม
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('เกิดข้อผิดพลาดในการส่งข้อมูล: ' + error.message);
    });
});