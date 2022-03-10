Docs:
    selector_template, FastSelectSysmgr, fastSelectList(), trigger() --> Used by System
    fastSelect(input, count?-1, afterPageLoad?0)
        * creates FastSelect. 
        * input: input-id of <div>.
        * count(optional): set maximum number of value to be entered(-1 -->default, unlimited).
        * afterPageLoad(if?required): creates fastselect after page load.
    fastSelectAdd(input, ids, vals)
        * Add item to fastselect manually.
        * input: input-id of <div>.
        * ids: list of Ids to be inserted.
        * vals: list of Vals tobe inserted.
        * Note: it doesnot obey FastSelectSysmgr --> maximum rule. So, insertion is unlimited.
    clearFastSelect(input)
        * Clears only data associated with fastselect.
        * input: input-id of <div>.
    deleteFastSelect(input)
        * Clears all data and controls associated with fastselect.
        * input: input-id of <div>.
        * Note: function fastSelect(input, count) can restore all controls
    User Extra Controls(Auto IF Triggers):
        fastInputStopped(input, setup);
            * input: input-id of <div>.
            * setup: True when input blocked and False when Input is open.
        fastOnChange(input, count_positive_int); OR fastOnChange(input);
            * input: input-id of <div>.
            * count_positive_int: number of occurences to be installed. -1 --> Unlimited (default).
            


Examples:

    ------------------------------------------->>>> Create fast select on page load
    <div class="" fast-select="post_data" data-input-id="fast_input_name"></div>

    ------------------------------------------->>>> Create fast select after page load
    fastSelect('fast_input_name', -1, 1);
    
    ------------------------------------------->>>> Optional:Limit number of Occurence of Fast Select
    fastSelect('fast_input_name', 1);


    ------------------------------------------->>>> Optional: Set Place Holder
    $(".fast-input").addClass("form-control custom-text").attr("placeholder","Search course");


    ------------------------------------------->>>> oninput get data from server
    function fast_input_nameInputFunction(input,data){
        $.ajax({
            url: '',
            type: 'POST',
            data: {data:data},
            success: function(ret){
            $("#pre_loader").hide();
            fastSelectList('input', ret);
            }
        });
    }
    ret example={'1':'d1','2':'d2','3':'d3','4':'d4'}
    As {key:value} format
    Note: fast_input_nameInputFunction, where fast_input_name is dynamically created oninput of #fast_input_name <input>

    ------------------------------------------->>>> Called when an Item added or removed in fast select
    function fastOnChange(input){
    }

    ------------------------------------------->>>> Called when Occurence Reached Maximum
    function fastInputStopped(input, setup){
        if(setup==true){
        }
    }

    ------------------------------------------->>>> Clear Fast Select Without Deleting Fast Select
    clearFastSelect('fast_input_name');

    ------------------------------------------->>>> Delete Fast Select Without Deleting Fast Select
    deleteFastSelect('fast_input_name');
