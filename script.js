
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');
    
    if (!form) {
        console.error('Form not found');
        return;
    }

    form.onsubmit = async function(event) {
        event.preventDefault(); // Prevent the default form submission

        console.log('Form submitted');

        // Check if inputs are defined
        const emailInput = this.email;
        const fullnameInput = this.fullname;

        if (!emailInput || !fullnameInput) {
            console.error('Email or fullname input not found');
            return;
        }

        const data = {
            email: emailInput.value,
            fullname: fullnameInput.value
        };

        try {
            const response = await fetch('https://x4ahnpl9rl.execute-api.ap-south-1.amazonaws.com/dev/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const responseData = await response.json();
            console.log('Success:', responseData);

            // Show success popup after submission
            Swal.fire({
                title: 'Success!',
                text: 'Details successfully registered!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                // Clear the form fields after clicking "OK" on the popup
                form.reset();
            });

        } catch (error) {
            console.error('Error:', error);

            // Show an error popup if something goes wrong
            Swal.fire({
                title: 'Error!',
                text: 'There was a problem registering your details.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };
});
