var selector_template='#<input>_fast_select';
class FastSelectSysmgr{
    constructor(input,count){
        var selector_query=selector_template.replace('<input>',input);
        this.arr = $(selector_query+' > div').map(function(){return $(this).find('label').attr('fast-id');}).get();
        this.counting=this.arr.length;
        if(count<=this.counting){
            $('#'+input).val('');
            $('#'+input).prop('disabled', true);
            if(typeof fastInputStopped == 'function'){ 
                fastInputStopped(input, true); 
            }
        }else{
            $('#'+input).val('');
            $('#'+input).prop('disabled', false);
            if(typeof fastInputStopped == 'function'){ 
                fastInputStopped(input, false); 
            }
        }
    }
}
function fastSelectList(input,list){
    try { JSON.parse(list); }catch(e){ return; }
    var option = "";
    var list = JSON.parse(list);
    for(var index in list) {
        option += "<option id='"+index+"' value='"+list[index]+"' />";
    }
    $('#fast_select_list_'+input).html(option);
}
function trigger(input){
    if(typeof fastOnChange == 'function'){ 
        fastOnChange(input); 
    }
}
$('div[fast-select="post_data"]').each(function(){
    var input=$(this).data('input-id');
    $(this).attr('id',input+'_fast_select');
    fastSelect(input);
});
function fastSelect(input,count=-1,afterPageLoad=0){
    if(afterPageLoad==1){
        $("div[data-input-id='"+input+"']").each(function(){
            var input=$(this).data('input-id');
            $(this).attr('id',input+'_fast_select');
            fastSelect(input,count);
        });
    }
    var selector_query=selector_template.replace('<input>',input);
    var on_input_function="if(typeof "+input+"InputFunction == 'function'){"+input+'InputFunction(\''+input+'\',this.value)}';
    $(selector_query).html('<input type="text" id="'+input+'" name="'+input+'" class="fast-input" oninput="'+on_input_function+'" fast-select-input="post_field" list="fast_select_list_'+input+'" autocomplete="off">');
    $(selector_query).append('<input type="hidden" id="'+input+'_id" name="'+input+'_id">');
    $(selector_query).append('<input type="hidden" id="'+input+'_value" name="'+input+'_value">');
    $(selector_query).append('<datalist id="fast_select_list_'+input+'"></datalist>');
    $("#"+input).change(function(){
        var fast_add = $(this).val();
        var opt = $('option[value="'+$(this).val()+'"]');
        var create_id = opt.length ? opt.attr('id') : '';
        var list = $('#'+input+'_id').val().split(',');
        var not_repeat = true;
        list.forEach(function(item,index){
            if(item == create_id){
                not_repeat=false;
            }
        });
        if(create_id==""){
            not_repeat=false;
        }
        if(not_repeat){
            $('<div class="fast-container"><label class="fast-label" fast-id="'+create_id+'">'+fast_add+'</label><input type="button" class="fast-close" value="X"></div>').insertBefore("#"+input);
            var ids = $(selector_query+' > div').map(function(){return $(this).find('label').attr('fast-id');}).get();
            var vals = $(selector_query+' > div').map(function(){return $(this).find('label').text();}).get();
            $('#'+input+'_value').val(vals.join(','));
            $('#'+input+'_id').val(ids.join(','));
            trigger(input);
        }
        $("#"+input).val('');
        if(count!=-1){
            sm = new FastSelectSysmgr(input,count);
        }
    });
    $(document).on('click','.fast-close',function() {
        $(this).closest("div").remove();
        var ids = $(selector_query+' > div').map(function(){return $(this).find('label').attr('fast-id');}).get();
        var vals = $(selector_query+' > div').map(function(){return $(this).find('label').text();}).get();
        $('#'+input+'_value').val(vals.join(','));
        $('#'+input+'_id').val(ids.join(','));
        if(count!=-1){
            sm = new FastSelectSysmgr(input,count);
        }
        trigger(input);
    });
}
function fastSelectAdd(input,ids,vals){
    var selector_query=selector_template.replace('<input>',input);
    if($(selector_query).length){
        var id_array = ids.split(',');
        var val_array = vals.split(',');
        id_array.forEach(function(ids,index){
            $('<div class="fast-container"><label class="fast-label" fast-id="'+id_array[index]+'">'+val_array[index]+'</label><input type="button" class="fast-close" value="X"></div>').insertBefore("#"+input);
            var ids = $(selector_query+' > div').map(function(){return $(this).find('label').attr('fast-id');}).get();
            var vals = $(selector_query+' > div').map(function(){return $(this).find('label').text();}).get();
            $('#'+input+'_value').val(vals.join(','));
            $('#'+input+'_id').val(ids.join(','));
            trigger(input);
        });
    }
    else{
        console.log('Error in fastSelectTag : '+input);
    }
}
function clearFastSelect(input){
    var selector_query=selector_template.replace('<input>',input);
    $('#'+input).remove();
    $('#'+input+'_id').remove();
    $('#'+input+'_value').remove();
    $(selector_query).html('');
    fastSelect(input);
}
function deleteFastSelect(input){
    var selector_query=selector_template.replace('<input>',input);
    $('#'+input).remove();
    $('#'+input+'_id').remove();
    $('#'+input+'_value').remove();
    $(selector_query).html('');
}
