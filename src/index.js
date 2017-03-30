import React from 'react';
import ReactDOM from 'react-dom';
import App from './code-snippet/App';

import $ from 'jquery';

ReactDOM.render(
  <App />,
  document.getElementById('code-snippets')
);

// We don't want to load the Expo embed on mobile devices
// because we don't have space to show it anyway.
function loadExpoOnlyOnDesktop() {
  const bp = 800;
  let loadedExpo = window.innerWidth >= bp;
  if (loadedExpo) {
    loadExpo();
  }

  $(window).resize(() => {
    if (! loadedExpo && window.innerWidth >= bp) {
      loadedExpo = true;
      loadExpo();
    }
  });

  function loadExpo() {
    // <script async src="https://sketch.expo.io/embed.js"></script>
    const s = document.createElement('script');
    s.src = 'https://sketch.expo.io/embed.js';
    s.async = true;
    document.head.appendChild(s);
  }
}

loadExpoOnlyOnDesktop();

if (location.hash == "#slack"){
    $('.layout').addClass('overlay-open slack');
  }

  $('.js-sidebar-toggle').click(function(e) {
    e.preventDefault();
    $('.layout').toggleClass('sidebar-visible');
  });

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
