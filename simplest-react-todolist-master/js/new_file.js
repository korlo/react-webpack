<script type="text/javascript">
	$(function() {
		var mScope = AngularUtil.getScope();
		var apply_no = mScope.data.biz_apply.apply_no;
		var orderInfo = mScope.orderInfo = {
			apply_no : apply_no
		};
		
			//报单前校验代码
	mScope.validReport = function(scope) {
		var msg = [];// 报错信息列表
		var apply = scope.data.biz_apply;// 订单数据
		var productType = !(apply.product_id || '').match(/tfb/i);// true交易，false，非交易
		// 买卖家信息校验
		var buyer;// 买家
		var seller;// 卖家
		var lender;// 借款人
		angular.forEach(apply.sub_biz_customer_rel, function(data) {
			if (!productType) {
				// 借款人
				lender = true;
			}
			if (data.relation == 'BUY') {
				buyer = true;
			}
			if (data.relation == 'OWN') {
				seller = true;
			}
		});
		// 房地产证信息
		if (!apply.sub_biz_house.length) {
			msg.push("请正确填写房产证信息！");
		}
		if (!apply.sub_biz_channel.length) {
			msg.push("请正确填写渠道信息！");
		}
		// 原贷款信息
		if (!apply.sub_biz_ori_loan.length) {
			msg.push("请正确填写原贷款信息！");
		}
		// 产品费用信息
		if (!apply.sub_biz_fee_summary.length) {
			msg.push("请正确填写产品费用信息！");
		}
	
		if (productType && !seller) {
			msg.push("请正确填写客户信息！");
		} else if (productType && !buyer) {
			msg.push("请正确填写客户信息！");
		} else if (!productType && !lender) {
			msg.push("请正确填写客户信息！");
		}
	
		if (productType) {
			// 交易信息
			if (!apply.sub_biz_deal_info.length) {
				msg.push("请正确填写交易信息！");
			}
		}
		// 征信信息
		if (!apply.sub_biz_query_credit.length) {
			msg.push("请正确填写征信信息！");
		}
		// 个人诉讼信息
		if (apply.sub_biz_personal_litigation.length == 0) {
			msg.push("请正确填写个人诉讼信息！");
		}
      //渠道信息
      if(!apply.sub_biz_channel||!apply.sub_biz_channel[0].channel_type||!apply.sub_biz_channel[0].channel_name){
        msg.push("请正确填写渠道信息！");
      } 
		if (msg.length >0) {
			$.topCall.error(msg.map(function(data) {
				return '<p>' + data + '</p>';
			}).join(""));
			return false;
		}
		return true;
	};
	})</script>
<table>
    <tbody>
        <tr class="firstRow">
            <td>
                <input type="hidden" ng-model="data.biz_apply.apply_no"/>
            </td>
        </tr>
    </tbody>
</table>
<div ddjf-order-apply="orderInfo"></div>