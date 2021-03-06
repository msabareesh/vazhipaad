var newId = 1
var newTest = { 'offering': null, 'id': `test-${newId}`, 'category': null }

$('#add-test').on('click', function() {
    $('.form-wrapper').removeClass('hidden')
})


$('#test-result').on('keyup', function() {
    newTest.category = $(this).val()
    console.log(newTest)

})

$('#test-name').on('change', function() {
    newTest.offering = $(this).val()
    console.log(newTest)
})

$('#create-test').on('click', function() {
    if (newTest.offering == null) {
        alert('No test selected!')
    } else {
        addRow(newTest)
        createTestPOST()
        $('#test-name').val('')
        $('#test-result').val('')
        $('.form-wrapper').addClass('hidden')
    }
})


function createTestPOST() {
    var url = '/offerings/createofferings/'

    $.ajax({
        method: 'POST',
        url: url,
        data: newTest,
        success: function() {

        }
    })

}

function updateTestPOST(data) {
    var url = '/offerings/updateofferings/'
    $.ajax({
        method: 'POST',
        url: url,
        data: data,
        success: function() {

        }
    })


}

function deleteTestPOST(data) {
    var url = '/offerings/deleteofferings/'
    $.ajax({
        method: 'POST',
        url: url,
        data: data,
        success: function() {

        }
    })


}


var tests = []
var dataURL = '/offerings/offeringsapi/'
$.ajax({
    method: 'GET',
    url: dataURL,
    success: function(response) {
        tests = response
        console.log(tests)
        for (var i in tests) {
            addRow(tests[i])
        }
    }
})




function addRow(obj) {
    var row = `<tr scope="row" class="test-row-${obj.id}">
                       <td>${obj.offering}</td>
                       <td id="result-${obj.id}" data-testid="${obj.id}"">${obj.category}</td>
                       <td>
                            <button class="btn btn-sm btn-danger" data-testid=${obj.id} id="delete-${obj.id}">Delete</button>
                            <button class="btn btn-sm btn-info" disabled data-testid="${obj.id}"  id="save-${obj.id}">Save</button>
                            
                            <button class="btn btn-sm btn-danger hidden" data-testid="${obj.id}"  id="cancel-${obj.id}">Cancel</button>
                            <button class="btn btn-sm btn-primary hidden" data-testid="${obj.id}"  id="confirm-${obj.id}">Confirm</button>
                            
                       </td>
                   </tr>`
    $('#tests-table').append(row)

    $(`#delete-${obj.id}`).on('click', deleteTest)
    $(`#cancel-${obj.id}`).on('click', cancelDeletion)
    $(`#confirm-${obj.id}`).on('click', confirmDeletion)
    $(`#save-${obj.id}`).on('click', saveUpdate)


    $(`#result-${obj.id}`).on('click', editResult)

}

function editResult() {
    var testid = $(this).data('testid')
    var value = $(this).html()

    $(this).unbind()
    $(this).html(`<input class="result form-control" data-testid=${testid} id="test-${testid}" type="text" value="${value}">`)

    $(`.result`).on('keyup', function() {
        var testid = $(this).data('testid')
        var saveBtn = $(`#save-${testid}`)
        saveBtn.prop('disabled', false)

    })

}

function saveUpdate() {
    console.log('Saved!')
    var testid = $(this).data('testid')
    var saveBtn = $(`#save-${testid}`)
    var row = $(`.test-row-${testid}`)

    saveBtn.prop('disabled', true)
    row.css('opacity', "0.5")

    var category = $(`#test-${testid}`).val()
    var data = { 'id': testid, 'category': category }
    updateTestPOST(data)

    setTimeout(function() {
        row.css('opacity', '1')
    }, 2000)


}


function deleteTest() {
    var testid = $(this).data('testid')

    var deleteBtn = $(`#delete-${testid}`)
    var saveBtn = $(`#save-${testid}`)
    var cancelBtn = $(`#cancel-${testid}`)
    var confirmBtn = $(`#confirm-${testid}`)

    deleteBtn.addClass('hidden')
    saveBtn.addClass('hidden')

    cancelBtn.removeClass('hidden')
    confirmBtn.removeClass('hidden')
}

function cancelDeletion() {
    var testid = $(this).data('testid')

    var deleteBtn = $(`#delete-${testid}`)
    var saveBtn = $(`#save-${testid}`)
    var cancelBtn = $(`#cancel-${testid}`)
    var confirmBtn = $(`#confirm-${testid}`)

    deleteBtn.removeClass('hidden')
    saveBtn.removeClass('hidden')

    cancelBtn.addClass('hidden')
    confirmBtn.addClass('hidden')

}

function confirmDeletion() {
    var testid = $(this).data('testid')
    var row = $(`.test-row-${testid}`)
    row.remove()
    var data = { 'id': testid }
    deleteTestPOST(data)

}