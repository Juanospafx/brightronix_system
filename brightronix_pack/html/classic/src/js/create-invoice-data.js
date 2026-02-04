import $ from 'jquery';
import 'jquery.repeater';

export const initCreateInvoice = () => {
    console.log("🚀 Create Invoice Init Started");

    // ==========================================
    // 1. REPEATER (For dynamic fields)
    // ==========================================
    if ($('.repeater').length > 0) {
        $('.repeater').repeater({
            defaultValues: {},
            show: function () {
                $(this).slideDown();
            },
            hide: function (deleteElement) {
                $(this).slideUp(deleteElement);
            },
            ready: function (setIndexes) {}
        });
    }

    // ==========================================
    // 2. TINYMCE (Inline Editing for Invoice)
    // ==========================================
    // We check for window.tinymce since we are loading it globally via the previous steps
    if (typeof window.tinymce !== 'undefined' && $('.editable').length > 0) {
        
        // Add unique IDs to editable elements
        let edCnt = 0;
        $('.editable').each(function () {
            $(this).attr('id', 'editable_' + edCnt);
            edCnt++;
        });

        const getEditorStatus = (editorId) => {
            return window.tinymce.get(editorId).mode.get();
        };

        const toggleEditorStatus = (editorId, currentStatus) => {
            if (currentStatus === "design") {
                window.tinymce.get(editorId).mode.set("readonly");
            } else {
                window.tinymce.get(editorId).mode.set("design");
            }
        };

        const enableDisable = (targetEditor) => {
            const status = getEditorStatus(targetEditor);
            toggleEditorStatus(targetEditor, status);
        };

        // Initialize TinyMCE on .editable class
        window.tinymce.init({
            selector: '.editable',
            inline: true,
            readonly: true,
            toolbar: false,
            menubar: false,
        });

        // Click to Edit
        let selId;
        $(document).on("click", ".edit-tyn", function (e) {
            const $wrap = $(this).closest('.inline-editable-wrap');
            selId = $wrap.find('.editable').attr('id');
            
            $(this).css('visibility', 'hidden');
            const el = document.getElementById(selId);
            
            if (el) {
                const range = document.createRange();
                const sel = window.getSelection();
                range.selectNodeContents(el);
                range.collapse(false);
                sel.removeAllRanges();
                sel.addRange(range);
                el.focus();
                enableDisable(selId);
            }
            return false;
        });

        // Focus out to Save/Close
        $(document).on("focusout", ".editable", function (e) {
            if (selId) {
                enableDisable(selId);
                $('.edit-tyn').css('visibility', 'visible');
            }
        });
    }

    // ==========================================
    // 3. INVOICE CALCULATIONS
    // ==========================================

    const calc_total = () => {
        let total = 0;
        let discounts = 0;
        
        $('.total').each(function () {
            const val = parseFloat($(this).val()) || 0;
            total += val;
        });
        
        $('.discount').each(function () {
            const val = parseFloat($(this).val()) || 0;
            discounts += val;
        });

        $('.gross-total, .subtotal').val(total.toFixed(2));
        $('.gross-discount').val(discounts.toFixed(2));
    };

    const calc = () => {
        $('.invoice-table tbody tr').each(function (i, element) {
            const html = $(this).html();
            if (html && html.trim() !== '') {
                const qty = parseFloat($(this).find('.qty').val()) || 0;
                const price = parseFloat($(this).find('.price').val()) || 0;
                const discount = parseFloat($(this).find('.discount').val()) || 0;
                const discType = $(this).find('.disc-type').val();
                
                let dis_price;
                if (discType == 1) { // Percentage
                    dis_price = price - (price * discount / 100);
                } else { // Fixed Amount
                    dis_price = price - discount;
                }
                
                $(this).find('.total').val((qty * dis_price).toFixed(2));
            }
        });
        calc_total();
    };

    // Initial Calc
    calc();

    // Event Listeners for Calculation
    $(document).on('keyup change', '.invoice-table tbody tr', function () {
        calc();
    });

    $(document).on('keyup change', '.subtotal-table tbody tr td', function () {
        const ext_discount = parseFloat($('.extdiscount').val()) || 0;
        const grosstot = parseFloat($('.gross-total').val()) || 0;
        const discType = $('.extra-disc-type').val();
        
        $('.extdiscount-read').val(ext_discount);
        
        let subtotal;
        if (discType == 1) {
            subtotal = grosstot - (grosstot * ext_discount / 100);
        } else {
            subtotal = grosstot - ext_discount;
        }
        
        $('.subtotal').val(subtotal.toFixed(2));
    });

    // ==========================================
    // 4. ADD / REMOVE ROWS
    // ==========================================
    
    $(document).on('click', '.add-new-row', function (e) {
        // Fixed the broken HTML string from the original file
        const newRowHtml = `
        <tr class="table-row-gap">
            <td></td>
        </tr>
        <tr>
            <td class="w-70 rounded-top-start border-end-0 border-bottom-0">
                <input type="text" class="form-control" placeholder="Item Title">
            </td>
            <td class="border-end-0 border-bottom-0">
                <input type="text" class="form-control qty" value="0">
            </td>
            <td class="w-15 border-end-0 border-bottom-0">
                <input type="text" class="form-control price" value="0">
            </td>
            <td class="border-end-0 border-bottom-0">
                <input type="text" class="form-control discount" value="0">
            </td>
            <td class="border-end-0 border-bottom-0">
                <select class="form-select w-70p disc-type">
                    <option value="1">%</option>
                    <option value="2">₹</option>
                </select>
            </td>
            <td class="w-20 rounded-bottom-end rounded-top-end bg-primary-light-5 close-over position-relative" rowspan="2">
                <input type="text" class="form-control total bg-transparent border-0 p-0" value="0" readonly>
                <button type="button" class="close-row btn-close">
                    <span aria-hidden="true">×</span>
                </button>
            </td>
        </tr>
        <tr>
            <td colspan="5" class="rounded-bottom-start border-end-0">
                <input type="text" class="form-control" placeholder="Item Description">
            </td>
        </tr>`;

        $('.invoice-table tbody').append(newRowHtml);
        return false;
    });

    $(document).on('click', '.close-row', function (e) {
        const $currentRow = $(this).closest('tr');
        // Structure is: Gap Row -> Main Row (this) -> Desc Row
        // We need to verify which row is which to delete correctly, 
        // but based on original code logic:
        
        $currentRow.prev().remove(); // Remove Gap
        $currentRow.next().remove(); // Remove Description
        $currentRow.remove();        // Remove Main
        
        calc();
        return false;
    });

    $(document).on('click', '.close-input', function (e) {
        $(this).closest('.form-group').remove();
        return false;
    });
};