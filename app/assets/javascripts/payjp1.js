$(document).on('turbolinks:load', function () {
  var form = $("#charge-form");
  Payjp.setPublicKey('pk_test_2226f8794a9cb7537df9cf45');

  $("#charge-form").on("click", "#submit-button", function (e) {
    e.preventDefault();
    form.find("input[type=submit]").prop("disabled", true);

    var card = {
      number: $("#payment_card_no").val(),
      cvc: $("#payment_card_cvc").val(),
      exp_month: $("#payment_card_expire_mm").val(),
      exp_year: $("#payment_card_expire_yy").val(),
    };
    Payjp.createToken(card, function (s, response) {
      if (response.error) {
        alert('トークン作成エラー発生');
        form.find('button').prop('disabled', false);
      }
      else {
        $(".number").removeAttr("name");
        $(".cvc").removeAttr("name");
        $(".exp_month").removeAttr("name");
        $(".exp_year").removeAttr("name");
        var token = response.id;

        $("#charge-form").append($('<input type="hidden" name="payjp_token" class="payjp-token" />').val(token));
        $("#charge-form").get(0).submit();
      }
    });
  });
});
