$(document).ready(function() {
  //load modal on module click
  $('.campus').on('click', function(event){
    $('#campusModal').on('show.bs.modal', function (event) {

      const modal = $(this)
      const module = $(event.relatedTarget) // Module that triggered the modal
      const moduleTitle = module.data('title') // Extract info from data-* attributes
      const moduleId = module.data('id')

      modal.find('.module-title').text('Available campus for ' + moduleTitle)

      var html_str = '';

      //Ajax Request
      $.ajax({
        url: "/campus",
        type: "GET",
        dataType: "json"
      })
      .done( (data) => {
        $.each(data, (i, val) => {
          html_str += (`
            <div class="col-lg-6 campus-cont">
                <a href="/program/`+ moduleId +`/`+ val._id +`" data-moduleId="`+ moduleId +`" data-campusId="`+ val._id +`" class="sel-campus">
                    <input type="hidden" name="campusId" value="`+ val._id +`">
                    <input type="hidden" name="moduleId" value="`+ moduleId +`">
                  <div class="col-xs-2">
                    <img class='campus-icon' src='./img/click.png' />
                  </div>
                  <div class="col-xs-10">
                    <p style="color:`+ val.color +`; font-size: 18px !important;">`+ val.city + `</p>
                    <p class="text-muted">`+ val.country +`</p>
                  </div>
                </a>
            </div>
          `);
        });

        modal.find('.module-content').html(html_str);

        //add no rotation
        modal.find('.module-content').append(`
          <div class="col-lg-6">
          <a href="/program/" class="sel-campus">
            <div class="col-sm-2">
              <img class='campus-icon' src='./img/click.png' />
            </div>
            <div class="col-sm-10">
              <p style="color: #8b8b8b; font-size: 18px !important;">No Rotation</p>
              <p class="text-muted">Stay in Home Campus</p>
            </div>
          </a>
          </div>
        `);
      });
    });
  });

  $('.sel-campus').on('click', (event) => {
    event.preventDefault();  
  
    const self = $(this)
    const moduleId = self.data('moduleId')
    const campusId = self.data('campusId')
    const url = self.attr('href')

    //Ajax Request
    $.ajax({
      url: url,
      type: "GET",
      dataType: "json"
    })
    .done( (data) => {
      console.log(data);
      // $.each(data, (i, val) => {
      //   html_str += (`
      //     <div class="col-lg-6 campus-cont">
      //       <a href="/campus/`+ val._id +`" class="sel-campus">
      //         <div class="col-xs-2">
      //           <img class='campus-icon' src='./img/click.png' />
      //         </div>
      //         <div class="col-xs-10">
      //           <p style="color:`+ val.color +`; font-size: 18px !important;">`+ val.city + `</p>
      //           <p class="text-muted">`+ val.country +`</p>
      //         </div>
      //       </a>
      //     </div>
      //   `);
      // });
    });
  });

  //change module class on hover
  $('.module')
    .mouseover((event) => {

      const self = $(event.target)

      self.closest('.module').find('.panel').removeClass('panel-default');
      self.closest('.module').find('.panel').addClass('panel-primary');
      self.closest('.module').find('.panel-body').css({
        "border-left": "2px dashed #8d333f",
        "border-right": "2px dashed #8d333f",
        "border-bottom": "2px dashed #8d333f"
      });
  })
    .mouseout((event) =>{

      const self = $(event.target)

      self.closest('.module').find('.panel').removeClass('panel-primary');
      self.closest('.module').find('.panel').addClass('panel-default');
      self.closest('.module').find('.panel-body').css({
        "border-left": "2px dashed #8b8b8b",
        "border-right": "2px dashed #8b8b8b",
        "border-bottom": "2px dashed #8b8b8b"
      });
    })
});
