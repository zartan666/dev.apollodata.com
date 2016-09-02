$(function() {
  FastClick.attach(document.body);

  $('.page').focus();

  $('.tooltip-trigger').each(function() {
      $(this).qtip({
        content: {
          text: $(this).find('.qtip-content'),
        },
        position: {
          my: 'top center',
          at: 'bottom center',
          adjust: {method: 'shift flip'},
          container: $('.page'),
          viewport: true
        },
        style: {
          classes: 'tooltip',
          tip: {
            corner: true,
            width: 12,
            height: 7
          }
        },
        show: {
          event: 'click',
          solo: true
        },
        hide: {
          event: 'click unfocus',
          fixed: true
        }
      });
  });

  if (location.hash == "#slack"){
    $('.layout').addClass('overlay-open slack');
  }

  $('.js-join-newsletter').click(function(e) {
    e.preventDefault();
    $('.layout').addClass('overlay-open contact');
  });

  $('.js-join-slack').click(function(e) {
    e.preventDefault();
    $('.layout').addClass('overlay-open slack');
  });

  $('.overlay-close').click(function(e) {
    e.preventDefault();
    $('.layout').attr('class', 'layout');
  });

  $('#newsletter-form').submit(function(e) {
    e.preventDefault();
    var email = e.target.email.value;
    var latestformsubmit = 'Apollo Newsletter Subscription';
    analytics.identify(email, {email: email, LatestFormSubmit: latestformsubmit});
    analytics.track('web.apollo-newsletter');
    $('.newsletter-form').addClass('confirmed');

    setTimeout(function(){
      $('.layout').attr('class', 'layout');
    }, 1200);
  });

  $('#slack-form').submit(function(e) {
    e.preventDefault();
    var email = e.target.email.value;
    var latestformsubmit = 'Apollo Slack Signup';
    var inviteuri = "https://29268947-a94c-4d45-baa2-9641a9848cad.trayapp.io?email=" + email;
    $.get(inviteuri);
    analytics.identify(email, {email: email, LatestFormSubmit: latestformsubmit});
    analytics.track('web.apollo-slack');
    $('.slack-form').addClass('confirmed');

    setTimeout(function(){
      $('.layout').attr('class', 'layout');
    }, 1200);
  });

  $('#consultation-form').submit(function(e) {
    e.preventDefault();
    var email = e.target.email.value;
    var firstname = e.target.firstname.value;
    var lastname = e.target.lastname.value;
    var company = e.target.company.value;
    var message = e.target.message.value;
    var latestformsubmit = 'Apollo Developer Support';

    analytics.identify(email, {email: email, firstName: firstname, lastName: lastname, company: company, Message__c: message, LatestFormSubmit: latestformsubmit});
    $('.consultation-form').addClass('confirmed');
    analytics.track('web.apollo-devsub');
  });


  $('#optics-form').submit(function(e) {
    e.preventDefault();
    var email = e.target.email.value;
    var firstname = e.target.firstname.value;
    var lastname = e.target.lastname.value;
    var company = e.target.company.value;
    var existingGraphQLLanguage = e.target.existingGraphQLLanguage.value;
    var message = e.target.message.value;
    var latestformsubmit = 'Apollo Optics Contact';

    analytics.identify(email, {email: email, firstName: firstname, lastName: lastname, company: company, Message__c: message, Existing_GraphQL_Language__c: existingGraphQLLanguage, LatestFormSubmit: latestformsubmit});
    $('.consultation-form').addClass('confirmed');
    analytics.track('web.apollo-optics');
  });

  $('[data-picker] [data-target]').click(function(e) {
    var $item = $(this);
    var target = $item.data('target');

    $item.closest('[data-picker]')
      .find('[data-target]').removeClass('active');
    $item.addClass('active');

    $item.closest('[data-picker]')
      .find('[data-name]').removeClass('active')
      .filter('[data-name=' + target + ']').addClass('active');

    // ensure any child pickers are selected first
    $item.closest('[data-picker]')
      .find('[data-picker] [data-target]:first-child').click();
  });
});
