document.getElementById("paymentForm").addEventListener("submit", payWithPaystack);

function payWithPaystack(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const amount = document.getElementById("amount").value * 100;

  const handler = PaystackPop.setup({
    key: "pk_test_xxxxxxxxxxxxxxxxxxxxxx", // Your public key
    email,
    amount,
    currency: "NGN",
    ref: "REF_" + Math.floor(Math.random() * 1000000000 + 1),
    callback: function (response) {
      fetch(`/verify/${response.reference}`)
        .then(res => res.json())
        .then(data => {
          if (data.status === "success") {
            alert("✅ Payment verified successfully!");
          } else {
            alert("❌ Verification failed.");
          }
        })
        .catch(err => alert("Error verifying payment."));
    },
    onClose: function () {
      alert("Payment window closed.");
    }
  });

  handler.openIframe();
}
document.getElementById("paymentForm").addEventListener("submit", payWithPaystack);

function payWithPaystack(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const amount = document.getElementById("amount").value * 100;

  const handler = PaystackPop.setup({
    key: "pk_test_xxxxxxxxxxxxxxxxxxxxxx", // Your public key
    email,
    amount,
    currency: "NGN",
    ref: "REF_" + Math.floor(Math.random() * 1000000000 + 1),
    callback: function (response) {
      fetch(`/verify/${response.reference}`)
        .then(res => res.json())
        .then(data => {
          if (data.status === "success") {
            alert("✅ Payment verified successfully!");
          } else {
            alert("❌ Verification failed.");
          }
        })
        .catch(err => alert("Error verifying payment."));
    },
    onClose: function () {
      alert("Payment window closed.");
    }
  });

  handler.openIframe();
}