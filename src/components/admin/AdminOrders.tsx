import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Order, OrderStatus, DeliveryPayload } from '../../types';
import { formatPrice } from '../../utils/currency';
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  Download, 
  X, 
  Send, 
  ShieldCheck, 
  Sparkles,
  Copy,
  Check
} from 'lucide-react';

interface AdminOrdersProps {
  initialSelectedOrderId?: string | null;
  onClearInitialSelectedOrder?: () => void;
}

export const AdminOrders: React.FC<AdminOrdersProps> = ({ 
  initialSelectedOrderId,
  onClearInitialSelectedOrder 
}) => {
  const { orders, updateOrderStatus, deleteOrder, currency } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Managing single order modal
  const [activeManagingOrderId, setActiveManagingOrderId] = useState<string | null>(initialSelectedOrderId || null);
  
  // Manage Form state
  const [newStatus, setNewStatus] = useState<OrderStatus>('processing');
  const [statusLogNote, setStatusLogNote] = useState('');
  const [credentialsOrLinks, setCredentialsOrLinks] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [successToast, setSuccessToast] = useState('');

  // Selected order
  const managingOrder = orders.find(o => o.id === activeManagingOrderId);

  // When opening managing modal, preload fields
  const handleOpenManager = (order: Order) => {
    setActiveManagingOrderId(order.id);
    setNewStatus(order.orderStatus);
    setStatusLogNote('');
    setCredentialsOrLinks(order.deliveryPayload?.credentialsOrLinks || '');
    setDeliveryNotes(order.deliveryPayload?.notes || '');
  };

  const handleCloseManager = () => {
    setActiveManagingOrderId(null);
    onClearInitialSelectedOrder?.();
  };

  const handleSaveStatusUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!managingOrder) return;

    const payload: DeliveryPayload = {
      credentialsOrLinks: credentialsOrLinks.trim() || undefined,
      notes: deliveryNotes.trim() || undefined,
      deliveryDate: newStatus === 'completed' ? new Date().toISOString() : managingOrder.deliveryPayload?.deliveryDate
    };

    updateOrderStatus(
      managingOrder.id,
      newStatus,
      statusLogNote.trim() || `Status updated to ${newStatus.toUpperCase()} by Operations Admin.`,
      payload
    );

    setSuccessToast(`Order ${managingOrder.id} successfully updated to ${newStatus.toUpperCase()}!`);
    setTimeout(() => setSuccessToast(''), 3000);
    handleCloseManager();
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.orderStatus === statusFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      order.id.toLowerCase().includes(q) ||
      order.customerName.toLowerCase().includes(q) ||
      order.customerEmail.toLowerCase().includes(q) ||
      order.serviceTitle.toLowerCase().includes(q) ||
      order.targetUrlOrBrief.toLowerCase().includes(q);

    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'completed': return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';
      case 'in_progress': return 'bg-purple-500/10 text-purple-300 border-purple-500/30';
      case 'processing': return 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30';
      case 'cancelled': return 'bg-rose-500/10 text-rose-300 border-rose-500/30';
      default: return 'bg-amber-500/10 text-amber-300 border-amber-500/30';
    }
  };

  // Export orders to CSV
  const handleExportCSV = () => {
    const headers = ['Order ID', 'Date', 'Customer Name', 'Customer Email', 'Service', 'Tier', 'Total Amount', 'Status', 'Payment Method'];
    const rows = orders.map(o => [
      o.id,
      new Date(o.createdAt).toLocaleString(),
      `"${o.customerName.replace(/"/g, '""')}"`,
      o.customerEmail,
      `"${o.serviceTitle.replace(/"/g, '""')}"`,
      `"${o.tierSelected.name}"`,
      o.totalAmount,
      o.orderStatus,
      o.paymentMethod
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `one_stop_solution_orders_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h3 className="text-xl font-bold text-white">Customer Orders & Real-Time Fulfillment</h3>
          <p className="text-xs text-slate-400">
            Monitor real-time order requests, execute status transitions, and deliver credentials/proofs directly to clients.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export CSV</span>
        </button>
      </div>

      {successToast && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1">
          {['all', 'pending', 'processing', 'in_progress', 'completed', 'cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Order ID, Name, Email..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4 font-semibold">Order ID</th>
                <th className="py-3 px-4 font-semibold">Customer</th>
                <th className="py-3 px-4 font-semibold">Service & Tier</th>
                <th className="py-3 px-4 font-semibold">Target / Brief</th>
                <th className="py-3 px-4 font-semibold">Amount</th>
                <th className="py-3 px-4 font-semibold">Payment</th>
                <th className="py-3 px-4 font-semibold">Live Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-950/50 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-indigo-300">
                      {order.id}
                    </td>
                    
                    <td className="py-3 px-4">
                      <div className="font-semibold text-white">{order.customerName}</div>
                      <div className="text-[10px] text-slate-400">{order.customerEmail}</div>
                      {order.customerPhone && (
                        <div className="text-[10px] text-slate-500">{order.customerPhone}</div>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-200 line-clamp-1">{order.serviceTitle}</div>
                      <div className="text-[11px] text-indigo-400 font-medium">
                        {order.tierSelected.name} ({order.tierSelected.amountOrDuration})
                      </div>
                    </td>

                    <td className="py-3 px-4 max-w-[200px]">
                      <span className="font-mono text-slate-400 line-clamp-2 text-[11px] bg-slate-950 px-2 py-1 rounded border border-slate-800/80">
                        {order.targetUrlOrBrief}
                      </span>
                    </td>

                    <td className="py-3 px-4 font-mono font-bold text-white">
                      {formatPrice(order.totalAmount, currency)}
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-mono text-[10px] text-slate-300 uppercase">
                        {order.paymentMethod.replace('_', ' ')}
                      </div>
                      <span className="text-[9px] text-emerald-400 font-bold uppercase">
                        ● {order.paymentStatus}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getStatusBadge(order.orderStatus)}`}>
                        {order.orderStatus.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenManager(order)}
                          className="px-2.5 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 font-semibold text-[11px] transition-colors"
                        >
                          Update Status
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`Delete order ${order.id}?`)) {
                              deleteOrder(order.id);
                            }
                          }}
                          className="p-1 rounded text-slate-500 hover:text-rose-400 transition-colors"
                          title="Delete Order"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-500">
                    No orders found matching the filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Real-time Order Updater & Dispatch Modal */}
      {managingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 overflow-hidden max-h-[90vh] flex flex-col text-xs">
            
            <div className="flex items-start justify-between pb-3 border-b border-slate-800 shrink-0">
              <div>
                <span className="text-[10px] font-mono text-indigo-400 font-bold">
                  MANAGE ORDER: {managingOrder.id}
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  {managingOrder.serviceTitle}
                </h3>
              </div>
              <button
                onClick={handleCloseManager}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStatusUpdate} className="space-y-4 my-4 overflow-y-auto pr-1 flex-1">
              
              {/* Customer & Target Summary */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-500">Customer:</span>
                  <span className="font-semibold text-white">{managingOrder.customerName} ({managingOrder.customerEmail})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Selected Tier:</span>
                  <span>{managingOrder.tierSelected.name} - {managingOrder.tierSelected.amountOrDuration}</span>
                </div>
                <div className="pt-1.5 border-t border-slate-800/80">
                  <span className="text-slate-500 block mb-0.5">Target / Brief:</span>
                  <span className="font-mono text-indigo-200 break-all">{managingOrder.targetUrlOrBrief}</span>
                </div>
              </div>

              {/* Status Selector */}
              <div>
                <label className="font-bold uppercase tracking-wider text-slate-300 block mb-1.5">
                  Update Real-Time Order Status:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(['pending', 'processing', 'in_progress', 'completed', 'cancelled'] as OrderStatus[]).map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setNewStatus(status)}
                      className={`p-2.5 rounded-xl border text-center font-semibold capitalize transition-all ${
                        newStatus === status
                          ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {status.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Update Note for Customer Event Log */}
              <div>
                <label className="font-semibold text-slate-300 block mb-1">
                  Status Log Note (Shown in Customer's Live Tracker Timeline):
                </label>
                <input
                  type="text"
                  value={statusLogNote}
                  onChange={(e) => setStatusLogNote(e.target.value)}
                  placeholder="e.g. Accounts provisioned and drip feed initiated at 200/hr..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Delivery Credentials / Download Links (Crucial for AI tools & Graphic Design) */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-indigo-500/30 space-y-2.5">
                <div className="flex items-center gap-1.5 text-indigo-300 font-bold uppercase tracking-wider text-[11px]">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Customer Delivery Payload (Credentials or Assets Link)</span>
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">
                    Login Credentials, Invite Link, or Design Download URL:
                  </label>
                  <textarea
                    rows={2}
                    value={credentialsOrLinks}
                    onChange={(e) => setCredentialsOrLinks(e.target.value)}
                    placeholder="e.g., Email: user@domain.com | Password: [SecurePass123] | Workspace Link: https://..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">
                    Delivery Notes / Instructions:
                  </label>
                  <input
                    type="text"
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                    placeholder="e.g. 30-day warranty active. Change temp password upon login."
                    className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleCloseManager}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Apply & Notify Customer</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
