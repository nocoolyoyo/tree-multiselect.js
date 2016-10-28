require('tree-multiselect');

var Common = require('./common');

describe('Options', () => {
  it('is collapsible', () => {
    $("select").append("<option value='one' data-section='test'>One</option>");
    $("select").append("<option value='two' data-section='test'>Two</option>");
    $("select").append("<option value='three' data-section='test'>Three</option>");
    $("select").treeMultiselect();

    var $section = Common.getSections();
    assert.equal($section.length, 1);

    var $title = $section.children("div.title");
    assert.equal($title.length, 1);

    Common.getSelections().each(function() {
      assert($(this).is(":visible"));
    });

    $title.click();

    Common.getSelections().each(function() {
      assert.notOk($(this).is(":visible"));
    });
  });

  it("startCollapsed doesn't do anything if collapsible is false", () => {
    $("select").append("<option value='one' data-section='test'>One</option>");
    $("select").append("<option value='two' data-section='test'>Two</option>");
    $("select").append("<option value='three' data-section='test'>Three</option>");

    $("select").append("<option value='four' data-section='test/inner'>Four</option>");
    $("select").append("<option value='five' data-section='test/inner2'>Five</option>");
    $("select").append("<option value='Six' data-section='test/inner2'>Six</option>");

    var options = {
      collapsible: false,
      startCollapsed: true
    };

    $("select").treeMultiselect(options);

    var $section = Common.getSections();
    assert.equal($section.length, 3);

    var $title = $section.children("div.title");
    assert.equal($title.length, 3);

    Common.getSelections().each(function() {
      assert($(this).is(":visible"));
    });

    $title.each(() => {
      $(this).click();
      Common.getSelections().each(function() {
        assert($(this).is(":visible"));
      });
    });
  });

  it('can set a different section delimiter', () => {
    var options = {
      sectionDelimiter: '-'
    };

    $("select").append("<option value='one' data-section='top-inner'>One</option>");
    $("select").append("<option value='two' data-section='top-inner'>Two</option>");
    $("select").append("<option value='three' data-section='top-inner2'>Three</option>");

    $("select").treeMultiselect(options);

    var $selections = Common.getSelections();
    assert.equal($selections.length, 3);

    var $sections = Common.getSections();
    assert.equal($selections.length, 3);
    var $innerSections = $sections.first().children(".section");
    assert.equal($innerSections.length, 2);

    assert.equal(Common.textOf($innerSections.first().children('div.title')), 'inner');
    assert.equal(Common.textOf($innerSections.last().children('div.title')), 'inner2');
  });

  it('can disable batch selection', () => {
    var options = {
      allowBatchSelection: false
    };

    $("select").append("<option value='one' data-section='test'>One</option>");
    $("select").append("<option value='two' data-section='test'>Two</option>");
    $("select").append("<option value='three' data-section='test'>Three</option>");

    $("select").append("<option value='four' data-section='test/inner'>Four</option>");
    $("select").append("<option value='five' data-section='test/inner2'>Five</option>");
    $("select").append("<option value='Six' data-section='test/inner2'>Six</option>");
    $("select").treeMultiselect(options);

    assert.equal("input.section[type=checkbox]".length, 0);
  });
});
//QUnit.test("can disable section display on selected items", function(assert) {
  //$("select").append("<option value='one' data-section='test' data-description='foobar' selected='selected'>One</option>");
  //var options = {
    //showSectionOnSelected: false
  //};
  //$("select").treeMultiselect(options);

  //var selectedItem = $("div.selected div.item");
  //assert.equal(selectedItem.length, 1);
  //assert.equal(selectedItem.find("span.section-name").length, 0);
//});

//QUnit.test("can freeze selections", function(assert) {
  //$("select").append("<option value='one' data-section='test'>One</option>");
  //$("select").append("<option value='two' data-section='test' selected='selected'>Two</option>");
  //var options = {
    //freeze: true
  //};
  //$("select").treeMultiselect(options);

  //var checkboxes = $("div.selections div.item > input[type=checkbox]");
  //assert.equal(checkboxes.length, 2);
  //checkboxes.each(function() {
    //var checkbox = $(this);
    //assert.ok(checkbox.attr('disabled'));
  //});

  //var removeSpans = $("div.selected span.remove-selected");
  //assert.equal(removeSpans.length, 0);
//});

//QUnit.test("freeze does not affect other treeMultiselects", function(assert) {
  //$("select").append("<option value='one' data-section='test'>One</option>");
  //$("select").treeMultiselect();

  //$("div#qunit-fixture").append("<select id='frozen'></select>");
  //$("select#frozen").append("<option value='two' data-section='test' selected='selected'>Two</option>");
  //var options = {
    //freeze: true
  //};
  //$("select#frozen").treeMultiselect(options);

  //var frozenOption = $("div.selections div.item:contains(Two)");
  //assert.equal(frozenOption.length, 1);
  //assert.ok(frozenOption.find("input[type=checkbox]")[0].hasAttribute('disabled'));

  //var unfrozenOption = $("div.selections div.item:contains(One)");
  //assert.equal(unfrozenOption.length, 1);
  //unfrozenOption.find("input[type=checkbox]").prop('checked', 'true').trigger('change');

  //var unfrozenSelection = $("div.selected div.item:contains(One)");
  //assert.equal(unfrozenSelection.length, 1);
  //assert.equal(unfrozenSelection.find("span.remove-selected").length, 1);
//});

//QUnit.test("Selected panel is not removed by default", function(assert) {
  //$("select").append("<option value='one' data-section='test'>One</option>");
  //$("select").treeMultiselect();

  //assert.equal($("div.selected").length, 1);
//});

//QUnit.test("hideSidePanel removes the selected panel", function(assert) {
  //$("select").append("<option value='one' data-section='test'>One</option>");
  //var options = {
    //hideSidePanel: true
  //};
  //$("select").treeMultiselect(options);

  //assert.equal($("div.selected").length, 0);
//});

//QUnit.test("onlyBatchSelection adds checkboxes to only sections", function(assert) {
  //$("select").append("<option value='one' data-section='test'>One</option>");
  //var options = {
    //onlyBatchSelection: true
  //};
  //$("select").treeMultiselect(options);
  //assert.equal($("div.title").length, 1);
  //assert.equal($("div.item").length, 1);

  //assert.equal($("div.title > input[type=checkbox]").length, 1);
  //assert.equal($("div.item > input[type=checkbox]").length, 0);
//});

//QUnit.test("onChange callback is called with correct args when item is added", function(assert) {
  //var done = assert.async();
  //$("select").append("<option value='one' data-section='test' selected='selected'>One</option>");
  //$("select").append("<option value='two' data-section='test'>Two</option>");
  //var options = {
    //onChange: function(all, added, removed) {
                //assert.equal(all.length, 2);
                //assert.equal(added.length, 1);
                //assert.equal(removed.length, 0);
                //var expectedSecondSelections = [all[1], added[0]];
                //for (var i = 0; i < expectedSecondSelections.length; ++i) {
                  //var selection = expectedSecondSelections[i];
                  //assert.equal(selection.text, 'Two');
                  //assert.equal(selection.value, 'two');
                  //assert.equal(selection.initialIndex, undefined);
                  //assert.equal(selection.section, 'test');
                //}
                //assert.equal(all[0].text, 'One');
                //assert.equal(all[0].value, 'one');
                //assert.equal(all[0].initialIndex, undefined);
                //assert.equal(all[0].section, 'test');
                //done();
              //}
  //};
  //$("select").treeMultiselect(options);

  //var $item = $("div.selections div.item").filter(function() {
    //return Util.textOf($(this)) == 'Two';
  //});
  //var $checkbox = $item.find("input[type=checkbox]");
  //$checkbox.click();
//});

//QUnit.test("onChange callback is called with correct args when item is removed", function(assert) {
  //var done = assert.async();
  //$("select").append("<option value='one' data-section='test' selected='selected'>One</option>");
  //$("select").append("<option value='two' data-section='test'>Two</option>");
  //var options = {
    //onChange: function(all, added, removed) {
                //assert.equal(all.length, 0);
                //assert.equal(added.length, 0);
                //assert.equal(removed.length, 1);

                //var removedSelection = removed[0];
                //assert.equal(removedSelection.text, 'One');
                //assert.equal(removedSelection.value, 'one');
                //assert.equal(removedSelection.initialIndex, undefined);
                //assert.equal(removedSelection.section, 'test');
                //done();
              //}
  //};
  //$("select").treeMultiselect(options);

  //var $item = $("div.selections div.item").filter(function() {
    //return Util.textOf($(this)) == 'One';
  //});
  //var $checkbox = $item.find("input[type=checkbox]");
  //$checkbox.click();
//});

//QUnit.test("sortable actually sorts the options", function(assert) {
  //$("select").append("<option value='one' data-section='test' selected='selected'>One</option>");
  //$("select").append("<option value='two' data-section='test' selected='selected'>Two</option>");
  //$("select").treeMultiselect({ sortable: true });

  //assert.deepEqual($("select").val(), ['one', 'two']);

  //var $one = $("div.selected div.item[data-value='one']");
  //var $two = $("div.selected div.item[data-value='two']");
  //$("div.selected").sortable('option', 'start')(null, {
    //item: $one
  //});
  //$one.insertAfter($two);
  //$("div.selected").sortable('option', 'stop')(null, {
    //item: $one
  //});

  //assert.deepEqual($("select").val(), ['two', 'one']);
//});

//QUnit.test("select all button is created and it works", function(assert) {
  //$("select").append("<option value='one' data-section='test'>One</option>");
  //$("select").append("<option value='two' data-section='test'>Two</option>");
  //$("select").treeMultiselect({ enableSelectAll: true });

  //var $selectAll = $(".select-all");
  //assert.equal($selectAll.length, 1);

  //var $selectedItems = $("div.selected div.item");
  //assert.equal($selectedItems.length, 0);

  //$selectAll.click();

  //$selectedItems = $("div.selected div.item");
  //assert.equal($selectedItems.length, 2);
//});

//QUnit.test("unselect all button is created and it works", function(assert) {
  //$("select").append("<option value='one' data-section='test' selected='selected'>One</option>");
  //$("select").append("<option value='two' data-section='test' selected='selected'>Two</option>");
  //$("select").treeMultiselect({ enableSelectAll: true });

  //var $unselectAll = $(".unselect-all");
  //assert.equal($unselectAll.length, 1);

  //var $selectedItems = $("div.selected div.item");
  //assert.equal($selectedItems.length, 2);

  //$unselectAll.click();

  //$selectedItems = $("div.selected div.item");
  //assert.equal($selectedItems.length, 0);
//});

//QUnit.test("select all text option works", function(assert) {
  //$("select").append("<option value='one' data-section='test' selected='selected'>One</option>");
  //var selectAllText = "foobar";
  //$("select").treeMultiselect({ enableSelectAll: true, selectAllText: selectAllText });

  //var $selectAll = $(".select-all");
  //assert.equal($selectAll.text(), selectAllText);
//});

//QUnit.test("unselect all text option works", function(assert) {
  //$("select").append("<option value='one' data-section='test' selected='selected'>One</option>");
  //var unselectAllText = "foobar";
  //$("select").treeMultiselect({ enableSelectAll: true, unselectAllText: unselectAllText });

  //var $unselectAll = $(".unselect-all");
  //assert.equal($unselectAll.text(), unselectAllText);
//});
